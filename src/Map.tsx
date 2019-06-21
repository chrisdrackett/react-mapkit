import React from 'react'

import { MapkitContext, MapkitProvider } from './MapkitProvider'
import { useMap } from './useMap'

type MapProps = {
  // ⚠️ Pick between callbackUrl or token.
  // https://developer.apple.com/documentation/mapkitjs/mapkit/2974045-init
  // not needed if within a `MapProvider`
  tokenOrCallback?: string
}

export const MapBox: React.FC = ({ children }) => {
  const { mapRef } = useMap()

  return (
    <div
      ref={mapRef}
      style={{ width: '100%', height: '100%' }}
      children={children}
    />
  )
}

export const Map: React.FC<MapProps> = ({ tokenOrCallback, ...props }) => {
  let context = React.useContext(MapkitContext)

  if (context.isInProvider) {
    return <MapBox {...props} />
  }

  // No Provider

  if (!tokenOrCallback) {
    throw new Error(
      '`tokenOrCallback` is required. Either add it to this `Map` component or to a `MapkitProvider` parent of this component.',
    )
  }

  return (
    <MapkitProvider tokenOrCallback={tokenOrCallback}>
      <MapBox {...props} />
    </MapkitProvider>
  )
}
