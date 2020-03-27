import React from 'react'
import ReactDOM from 'react-dom'

import devToken from '../devToken'
import { MapkitProvider, Map } from '../src'

const App = () => {
  return (
    <MapkitProvider tokenOrCallback={devToken}>
      <Map />
    </MapkitProvider>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
