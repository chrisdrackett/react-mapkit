import React from 'react'

import { storiesOf } from '@storybook/react'

import { Map, MapkitProvider, useMap } from '../src'
import devToken from '../devToken'

const UseMapExample = () => {
  const { setRotation, mapRef } = useMap()

  return (
    <>
      <button onClick={() => setRotation(Math.random() * 360)}>rotate!</button>
      <div ref={mapRef} style={{ width: '100%', height: '80%' }} />
    </>
  )
}

storiesOf('Use', module)
  .add('with a provider', () => (
    <MapkitProvider tokenOrCallback={devToken}>
      <Map />
    </MapkitProvider>
  ))
  .add('just a Map', () => <Map tokenOrCallback={devToken} />)
  .add('using a ref', () => {
    return (
      <MapkitProvider tokenOrCallback={devToken}>
        <UseMapExample />
      </MapkitProvider>
    )
  })
  .add('multiple providers', () => (
    <>
      <MapkitProvider tokenOrCallback={devToken}>
        <Map />
      </MapkitProvider>
      <MapkitProvider tokenOrCallback={devToken}>
        <Map />
      </MapkitProvider>
    </>
  ))
