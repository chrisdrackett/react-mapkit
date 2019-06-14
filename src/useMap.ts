/* global mapkit */

import React from 'react'
import load from 'little-loader'

import {
  NumberTuple,
  Rect,
  RegionType,
  createCoordinate,
  createMapRect,
  createCoordinateRegionFromValues,
} from './utils'

export type DefaultOptions = {
  visibleMapRect?: Rect
  region?: RegionType
  center?: NumberTuple
  rotation?: number
  tintColor?: string
}

export const useMap = (
  // ⚠️ Pick between callbackUrl or token.
  // https://developer.apple.com/documentation/mapkitjs/mapkit/2974045-init
  tokenOrCallback: string,

  // default options for setting up the map.
  defaultOptions: DefaultOptions = {},
) => {
  const mapElement = React.useRef<HTMLDivElement>(null)

  const mapRef = React.useRef<mapkit.Map>()

  const [token] = React.useState(tokenOrCallback)
  const [defaultMapOptions] = React.useState(defaultOptions)

  const [map, setMap] = React.useState<mapkit.Map>()
  const [mapKit, setMapKit] = React.useState<typeof mapkit>()

  // Initial Setup
  React.useEffect(() => {
    // we only want to setup once after we have the mapElement ref
    if (!mapKit && mapElement.current) {
      load('https://cdn.apple-mapkit.com/mk/5.x.x/mapkit.js', () => {
        setMapKit(mapkit)

        const isCallback = token.includes('/')

        // init mapkit
        mapkit.init({
          authorizationCallback: (done) => {
            if (isCallback) {
              fetch(token)
                .then((res) => res.text())
                .then(done)
            } else {
              done(token)
            }
          },
        })

        // Create the 🗺️ using the default options
        if (mapElement.current) {
          const newMap = new mapkit.Map(mapElement.current, {
            visibleMapRect:
              defaultMapOptions.visibleMapRect &&
              createMapRect(...defaultMapOptions.visibleMapRect),
            region:
              defaultMapOptions.region &&
              createCoordinateRegionFromValues(defaultMapOptions.region),
            center:
              defaultMapOptions.center &&
              createCoordinate(...defaultMapOptions.center),
            rotation: defaultMapOptions.rotation,
            tintColor: defaultMapOptions.tintColor,
          })
          mapRef.current = newMap
          setMap(newMap)
        }
      })
    }
  }, [defaultMapOptions, mapElement, mapKit, token])

  // Clean up the map on unmount
  React.useEffect(() => {
    if (mapRef.current) {
      mapRef.current.destroy()
    }
  }, [])

  return {
    mapRef: mapElement,
    map: map,
    mapkit: mapKit,
    setRotation: (rotationValue: number, isAnimated: boolean = false) => {
      if (map) {
        map.setRotationAnimated(rotationValue, isAnimated)
      }
    },
    setCenter: (centerValue: NumberTuple, isAnimated: boolean = false) => {
      if (map) {
        map.setCenterAnimated(createCoordinate(...centerValue), isAnimated)
      }
    },
    setRegion: (region: RegionType, isAnimated: boolean = false) => {
      if (map) {
        map.setRegionAnimated(
          createCoordinateRegionFromValues(region),
          isAnimated,
        )
      }
    },
    setVisibleMapRect: (visibleMapRect: Rect, isAnimated: boolean = false) => {
      if (map) {
        map.setVisibleMapRectAnimated(
          createMapRect(...visibleMapRect),
          isAnimated,
        )
      }
    },
  }
}
