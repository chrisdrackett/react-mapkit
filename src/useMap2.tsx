import React from 'react'

import { MapkitContext } from './MapkitProvider'

export const useMap = () => {
  let { mapkit } = React.useContext(MapkitContext)
  let mapRef = React.useRef<HTMLDivElement>(null)
  let map = React.useRef<mapkit.Map>()

  React.useEffect(() => {
    if (mapkit && mapRef.current) {
      map.current = new mapkit.Map(mapRef.current)
    }
  }, [map, mapRef, mapkit])

  return { map: map.current, mapRef }
}
