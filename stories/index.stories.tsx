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

storiesOf('Defaults', module)
  .add('center', () => (
    <Map tokenOrCallback={devToken} center={[37.415, -122.048333]} />
  ))
  .add('visibleMapRect', () => (
    <Map tokenOrCallback={devToken} visibleMapRect={[0.5, 0.2, 0.3, 0.4]} />
  ))
  .add('region', () => (
    <Map
      tokenOrCallback={devToken}
      region={{
        latitude: 37.415,
        longitude: -122.048333,
        latitudeSpan: 0.016,
        longitudeSpan: 0.016,
      }}
    />
  ))
  .add('rotation', () => <Map tokenOrCallback={devToken} rotation={90} />)
  .add('tint', () => <Map tokenOrCallback={devToken} tintColor={'#00b64e'} />)
  .add('padding', () => <Map tokenOrCallback={devToken} padding={20} />)
