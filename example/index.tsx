import React from 'react'
import ReactDOM from 'react-dom'

import devToken from '../devToken'
import { useMap } from '../.'

const App = () => {
  const { mapRef, setRotation } = useMap(devToken, {
    region: {
      latitude: 37,
      longitude: -122,
      latitudeSpan: 0.12,
      longitudeSpan: 0.12,
    },
  })
  return (
    <div>
      <button onClick={() => setRotation(Math.random() * 360)}>rotate!</button>
      <div ref={mapRef} />
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
