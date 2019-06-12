import React from 'react'
import ReactDOM from 'react-dom'

import { MapKit } from '../.'

const App = () => {
  return (
    <div>
      <MapKit />
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
