import React from 'react'

// import { MapkitContext } from './useMap'

import { ImageUrl } from './utils'

type MarkerProps = {
  latitude: number
  longitude: number
  color?: string
  glyphColor?: string
  glyphImage?: ImageUrl
  glyphText?: string
  selectedGlyphImage?: ImageUrl
  subtitleVisibility?: string
  titleVisibility?: string
}

export const Marker: React.FC<MarkerProps> = () => {
  // const context = React.useContext(MapkitContext)

  return <div>Marker!</div>
}
