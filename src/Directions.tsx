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
  transportType: string
  style?: mapkit.StyleConstructorOptions
  options?: mapkit.DirectionsConstructorOptions
  showAnnotations?: boolean
  annotationOptions?: annotationOptions
  onRouteUpdate?: (arg0: {
    steps: mapkit.RouteStep[]
    distance: number
    expectedTravelTime: number
  }) => void
}

export const Directions: React.FC<DirectionsProps> = ({
  origin,
  destination,
  transportType = mapkit.Directions.Transport.Automobile,
  style,
  showAnnotations = true,
  annotationOptions = {
    origin: { color: 'red' },
    destination: { color: 'green' },
  },
  options,
  onRouteUpdate = () => null,
}) => {
  const { mapkit, map } = React.useContext(MapContext)

  React.useEffect(() => {
    if (mapkit && map) {
      const directions = new mapkit.Directions(options)
      const originCoordinates = createCoordinate(origin[0], origin[1])
      const destinationCoordinates = createCoordinate(
        destination[0],
        destination[1],
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
            transportType || mapkit.Directions.Transport.Automobile,
        },
        (err, data) => {
          if (err) return console.error(err)
          for (const [index, route] of data['routes'].entries()) {
            if (index !== 0) return
            const overlay = route.polyline
            const styles = new mapkit.Style(style)
            overlay.style = styles
            map.addOverlay(overlay)
            onRouteUpdate({
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
