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

type ContextType = {
  map?: mapkit.Map
  mapkit?: typeof mapkit
}

export const MapkitContext = React.createContext<ContextType>({
  map: undefined,
  mapkit: undefined,
})

export const useMap = (
  // ⚠️ Pick between callbackUrl or token.
  // https://developer.apple.com/documentation/mapkitjs/mapkit/2974045-init
  tokenOrCallback: string,

  // default options for setting up the map.
  defaultOptions: DefaultOptions = {},
) => {
  const [token] = React.useState(tokenOrCallback)
  const [defaultMapOptions] = React.useState(defaultOptions)

  const [mapkitLoaded, setMapkitLoaded] = React.useState(false)
  const [mapLoaded, setMapLoaded] = React.useState(false)

  const [context, setContext] = React.useState<ContextType>()

  // Initial Setup
  // Load the mapkit script from apple
  React.useEffect(() => {
    try {
      // check to see if mapkit has been loaded
      mapkit.build
      setMapkitLoaded(true)
    } catch (err) {
      // mapkit has not loaded yet
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

        setMapkitLoaded(true)
      })
    }

    // Clean up the map on unmount
    return () => {
      if (context && context.map) {
        context.map.destroy()
      }
    }
  }, [context, token])

  const mapRef = React.useCallback(
    (node: HTMLDivElement) => {
      if (mapkitLoaded && node !== null) {
        // Create the 🗺️ using the default options
        const map = new mapkit.Map(node, {
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

        setContext({
          map,
          mapkit,
        })

        setMapLoaded(true)
      }
    },
    [
      defaultMapOptions.center,
      defaultMapOptions.region,
      defaultMapOptions.rotation,
      defaultMapOptions.tintColor,
      defaultMapOptions.visibleMapRect,
      mapkitLoaded,
    ],
  )

  const MapComponent: React.FC = React.useCallback(
    ({ children }) => {
      if (mapkitLoaded) {
        return (
          <>
            <div ref={mapRef} style={{ width: '100%', height: '100%' }} />
            {mapLoaded && (
              <MapkitContext.Provider
                value={context as ContextType}
                children={children}
              />
            )}
          </>
        )
      }

      return null
    },
    [mapkitLoaded, mapRef, mapLoaded, context],
  )

  return {
    map: context && context.map,
    mapkit: context && context.mapkit,
    MapComponent,
    setRotation: React.useCallback(
      (rotationValue: number, isAnimated: boolean = false) => {
        if (context && context.map) {
          context.map.setRotationAnimated(rotationValue, isAnimated)
        }
      },
      [context],
    ),
    setCenter: React.useCallback(
      (centerValue: NumberTuple, isAnimated: boolean = false) => {
        if (context && context.map) {
          context.map.setCenterAnimated(
            createCoordinate(...centerValue),
            isAnimated,
          )
        }
      },
      [context],
    ),
    setRegion: React.useCallback(
      (region: RegionType, isAnimated: boolean = false) => {
        if (context && context.map) {
          context.map.setRegionAnimated(
            createCoordinateRegionFromValues(region),
            isAnimated,
          )
        }
      },
      [context],
    ),
    setVisibleMapRect: React.useCallback(
      (visibleMapRect: Rect, isAnimated: boolean = false) => {
        if (context && context.map) {
          context.map.setVisibleMapRectAnimated(
            createMapRect(...visibleMapRect),
            isAnimated,
          )
        }
      },
      [context],
    ),
  }
}
