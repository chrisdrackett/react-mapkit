import React from 'react'

import { MapContext } from '../Map'

import { createCoordinate, NumberTuple } from '../utils'

type PolygonOverlayProps = {
  points: NumberTuple[]
  data?: object
  styles?: mapkit.StyleConstructorOptions
}

export const PolygonOverlay: React.FC<PolygonOverlayProps> = ({
  points,
  data,
  styles = { lineWidth: 2, strokeColor: '#999' },
}) => {
  const { mapkit, map } = React.useContext(MapContext)
  React.useEffect(() => {
    if (mapkit && map) {
      const coordinates = points.map((p) => createCoordinate(p[0], p[1]))
      const overlay = new mapkit.PolygonOverlay(coordinates)
      overlay.style = new mapkit.Style(styles)
      data ? (overlay.data = data) : null
      map.addOverlay(overlay)
    }
  }, [mapkit, map, points, styles])

  return null
}
