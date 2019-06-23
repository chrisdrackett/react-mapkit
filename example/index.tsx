import React from 'react'
import ReactDOM from 'react-dom'

import devToken from '../devToken'
import { MapkitProvider, Map, Marker } from '../src'

const App = () => {
  return (
    <MapkitProvider tokenOrCallback={devToken}>
      <Map>
        <Marker />
      </Map>
    </MapkitProvider>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
