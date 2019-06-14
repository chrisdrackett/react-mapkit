import React from 'react'

import { storiesOf } from '@storybook/react'

import { MapWithDefaults } from './MapWithDefaults'

storiesOf('Defaults', module)
  .add('center', () => <MapWithDefaults center={[37.415, -122.048333]} />)
  .add('visibleMapRect', () => (
    <MapWithDefaults visibleMapRect={[0.5, 0.2, 0.3, 0.4]} />
  ))
  .add('region', () => (
    <MapWithDefaults
      region={{
        latitude: 37.415,
        longitude: -122.048333,
        latitudeSpan: 0.016,
        longitudeSpan: 0.016,
      }}
    />
  ))
  .add('rotation', () => <MapWithDefaults rotation={90} />)
  .add('tint', () => <MapWithDefaults tintColor={'#00b64e'} />)
