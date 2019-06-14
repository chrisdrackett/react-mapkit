/* global mapkit */

import React from 'react'
import load from 'little-loader'

import {
  NumberTuple,
  Rect,
  createCoordinate,
  createMapRect,
  createCoordinateRegion,
  createCoordinateSpan,
} from './utils'

export type DefaultOptions = {
  visibleMapRect?: Rect
  region?: {
    latitude: number
    longitude: number
    latitudeSpan: number
    longitudeSpan: number
  }
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
  const map = React.useRef<mapkit.Map>()

  const [token] = React.useState(tokenOrCallback)
  const [defaultMapOptions] = React.useState(defaultOptions)

  // Initial Setup
  React.useEffect(() => {
    if (mapElement.current) {
      load('https://cdn.apple-mapkit.com/mk/5.x.x/mapkit.js', () => {
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
          map.current = new mapkit.Map(mapElement.current, {
            visibleMapRect:
              defaultMapOptions.visibleMapRect &&
              createMapRect(...defaultMapOptions.visibleMapRect),
            region:
              defaultMapOptions.region &&
              createCoordinateRegion(
                createCoordinate(
                  defaultMapOptions.region.latitude,
                  defaultMapOptions.region.longitude,
                ),
                createCoordinateSpan(
                  defaultMapOptions.region.latitudeSpan,
                  defaultMapOptions.region.longitudeSpan,
                ),
              ),
            center:
              defaultMapOptions.center &&
              createCoordinate(...defaultMapOptions.center),
            rotation: defaultMapOptions.rotation,
            tintColor: defaultMapOptions.tintColor,
          })
        }
      })
    }
  }, [defaultMapOptions, mapElement, token])

  return {
    mapRef: mapElement,
    setRotation: (rotationValue: number, isAnimated: boolean = false) => {
      if (map.current) {
        map.current.setRotationAnimated(rotationValue, isAnimated)
      }
    },
    setCenter: (centerValue: NumberTuple, isAnimated: boolean = false) => {
      if (map.current) {
        map.current.setCenterAnimated(
          createCoordinate(...centerValue),
          isAnimated,
        )
      }
    },
  }
}
