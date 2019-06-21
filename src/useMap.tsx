import React from 'react'

import { MapkitContext } from './MapkitProvider'

import {
  NumberTuple,
  Rect,
  RegionType,
  createCoordinate,
  createMapRect,
  createCoordinateRegionFromValues,
} from './utils'

export const useMap = () => {
  let { mapkit } = React.useContext(MapkitContext)
  let mapRef = React.useRef<HTMLDivElement>(null)
  let [map, setMap] = React.useState<mapkit.Map>()

  React.useEffect(() => {
    if (mapkit && mapRef.current) {
      const newMap = new mapkit.Map(mapRef.current)
      setMap(newMap)
    }
  }, [mapRef, mapkit])

  // Clean up the map on unmount
  React.useEffect(() => {
    return () => {
      if (map) {
        map.destroy()
      }
    }
  }, [map])

  return {
    mapkit,
    map,
    mapRef,
    setRotation: React.useCallback(
      (rotationValue: number, isAnimated: boolean = false) => {
        if (map) {
          map.setRotationAnimated(rotationValue, isAnimated)
        }
      },
      [map],
    ),
    setCenter: React.useCallback(
      (centerValue: NumberTuple, isAnimated: boolean = false) => {
        if (map) {
          map.setCenterAnimated(createCoordinate(...centerValue), isAnimated)
        }
      },
      [map],
    ),
    setRegion: React.useCallback(
      (region: RegionType, isAnimated: boolean = false) => {
        if (map) {
          map.setRegionAnimated(
            createCoordinateRegionFromValues(region),
            isAnimated,
          )
        }
      },
      [map],
    ),
    setVisibleMapRect: React.useCallback(
      (visibleMapRect: Rect, isAnimated: boolean = false) => {
        if (map) {
          map.setVisibleMapRectAnimated(
            createMapRect(...visibleMapRect),
            isAnimated,
          )
        }
      },
      [map],
    ),
  }
}
