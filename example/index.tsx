import React from 'react'
import ReactDOM from 'react-dom'

import devToken from '../devToken'
import { useMap, Marker } from '../.'

const App = () => {
  const { MapComponent, setRotation } = useMap(devToken, {
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
      <MapComponent>
        <Marker />
      </MapComponent>
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
