import React from 'react'

import { MapContext } from './Map'

import {
  createCoordinate,
  propsToMarkerConstructionOptions,
  AnnotationOptions,
} from './utils'

type AnnotationProps = {
  latitude: number
  longitude: number
  factory: (
    coordinate: mapkit.Coordinate,
    options?: mapkit.AnnotationConstructorOptions,
  ) => Element
} & AnnotationOptions

export const Annotation: React.FC<AnnotationProps> = ({
  latitude,
  longitude,
  factory,
  ...options
}) => {
  const { mapkit, map } = React.useContext(MapContext)
  const annotation = React.useRef<mapkit.Annotation>()

  React.useEffect(() => {
    if (mapkit && map) {
      annotation.current = new mapkit.Annotation(
        createCoordinate(latitude, longitude),
        factory,
        propsToMarkerConstructionOptions(options),
      )

      map.addAnnotation(annotation.current)
    }
    return () => { annotation.current && map && map.removeAnnotation(annotation.current) }
  }, [mapkit, map])

  return null
}
