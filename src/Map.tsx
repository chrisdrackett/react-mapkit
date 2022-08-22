/* global mapkit */

import React from 'react'

import { MapkitContext, MapkitProvider } from './MapkitProvider'
import { useMap } from './useMap'
import { MapOptions } from './utils'

type MapRef = React.RefObject<HTMLDivElement>

type MapContextType = {
  map?: mapkit.Map
  mapkit?: typeof mapkit
}

export const MapContext = React.createContext<MapContextType>({
  map: undefined,
  mapkit: undefined,
})

const MapProvider: React.FC<{ context: MapContextType }> = ({
  children,
  context,
}) => {
  return <MapContext.Provider value={context} children={children} />
}

// this component is the parent to the mapkit generated map components
const MapContainer: React.FC<{ mapRef: MapRef }> = ({ children, mapRef }) => {
  return (
    <div
      ref={mapRef}
      style={{ width: '100%', height: '100%' }}
      children={children}
    />
  )
}

const CreateMap: React.FC<MapOptions> = ({ children, ...defaultOptions }) => {
  const {
    mapProps: { mapkit, map, mapRef },
  } = useMap(defaultOptions)

  return (
    <MapProvider context={{ mapkit, map }}>
      <MapContainer mapRef={mapRef} children={children} />
    </MapProvider>
  )
}

export const Map: React.FC<PropsWithChildren<{
  // ⚠️ Pick between callbackUrl or token.
  // https://developer.apple.com/documentation/mapkitjs/mapkit/2974045-init
  // not needed if within a `MapProvider`
  tokenOrCallback?: string
  language?: string
  mapRef?: MapRef
  mapkit?: typeof mapkit
  map?: mapkit.Map
} & MapOptions>
> = ({ tokenOrCallback, language = 'en', mapkit, map, mapRef, ...props }) => {
  let context = React.useContext(MapkitContext)

  // map has already been created, we just need to setup the provider
  if (mapRef) {
    return (
      <MapProvider context={{ mapkit, map }}>
        <MapContainer mapRef={mapRef} {...props} />
      </MapProvider>
    )
  }

  // map hasn't yet been created, lets create it!
  const mapBox = <CreateMap {...props} />

  // we are in a provider, just return the map
  if (context.isInProvider) {
    return mapBox
  }

  // No Provider setup provider around map
  if (!tokenOrCallback) {
    throw new Error(
      '`tokenOrCallback` is required. Either add it to this `Map` component or to a `MapkitProvider` parent of this component.',
    )
  }

  return (
    <MapkitProvider
      tokenOrCallback={tokenOrCallback}
      language={language}
      children={mapBox}
    />
  )
}
