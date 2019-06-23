import React from 'react'

import { useMap, DefaultOptions } from '../'
import devToken from '../devToken'

export const MapWithDefaults = (defaults: DefaultOptions = {}) => {
  const { mapRef } = useMap(devToken, defaults)

  return <div ref={mapRef} style={{ width: '100%', height: '100%' }} />
}
