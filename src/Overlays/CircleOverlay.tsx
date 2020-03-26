import React from 'react'

import { MapContext } from '../Map'

import { createCoordinate } from '../utils'

type CircleOverlayProps = {
  latitude: number
  longitude: number
  radius: number
  data?: object
  styles?: mapkit.StyleConstructorOptions
}

export const CircleOverlay: React.FC<CircleOverlayProps> = ({
  latitude,
  longitude,
  radius,
  data,
  styles = { lineWidth: 2, strokeColor: '#999' },
}) => {
  const { mapkit, map } = React.useContext(MapContext)

  React.useEffect(() => {
    if (mapkit && map) {
      const coordinates = createCoordinate(latitude, longitude)
      const overlay = new mapkit.CircleOverlay(coordinates, radius)
      overlay.style = new mapkit.Style(styles)
      data ? (overlay.data = data) : null
      map.addOverlays([overlay])
    }
  }, [mapkit, map, latitude, longitude, radius, styles])

  return null
}
