import React from 'react'

import { MapContext } from './Map'

import { createCoordinate, NumberTuple } from './utils'

type annotationOptions = {
  origin?: mapkit.MarkerAnnotationConstructorOptions
  destination?: mapkit.MarkerAnnotationConstructorOptions
}

type DirectionsProps = {
  origin: NumberTuple
  destination: NumberTuple
  transportType?: 'Automobile' | 'Walking'
  style?: mapkit.StyleConstructorOptions
  options?: mapkit.DirectionsConstructorOptions
  showAnnotations?: boolean
  annotationOptions?: annotationOptions
  routeDetails?: (arg0: {
    steps: mapkit.RouteStep[]
    distance: number
    expectedTravelTime: number
  }) => void
}

export const Directions: React.FC<DirectionsProps> = ({
  origin,
  destination,
  transportType = 'Automobile',
  style,
  showAnnotations = true,
  annotationOptions = {
    origin: { color: 'red' },
    destination: { color: 'green' },
  },
  options,
  routeDetails = () => null,
}) => {
  const { mapkit, map } = React.useContext(MapContext)

  React.useEffect(() => {
    if (mapkit && map) {
      const directions = new mapkit.Directions(options)
      const originCoordinates = createCoordinate(
        origin[0] as number,
        origin[1] as number,
      )
      const destinationCoordinates = createCoordinate(
        destination[0] as number,
        destination[1] as number,
      )

      if (showAnnotations) {
        const originAnnotation = new mapkit.MarkerAnnotation(
          originCoordinates,
          {
            ...annotationOptions.origin,
            draggable: false,
          },
        )

        const destinationAnnotation = new mapkit.MarkerAnnotation(
          destinationCoordinates,
          {
            ...annotationOptions.destination,
            draggable: false,
          },
        )

        map.addAnnotations([originAnnotation, destinationAnnotation])
      }

      directions.route(
        {
          origin: originCoordinates,
          destination: destinationCoordinates,
          transportType:
            transportType === 'Automobile'
              ? mapkit.Directions.Transport.Automobile
              : mapkit.Directions.Transport.Walking,
        },
        (err, data) => {
          if (err) return console.error(err)
          for (const [index, route] of data['routes'].entries()) {
            if (index !== 0) return
            const overlay = route.polyline
            const styles = new mapkit.Style(style)
            overlay.style = styles
            map.addOverlay(overlay)
            routeDetails({
              steps: route.steps,
              distance: route.distance,
              expectedTravelTime: route.expectedTravelTime,
            })
          }
        },
      )
    }
  }, [mapkit, map, origin, destination, transportType, options])

  return null
}
