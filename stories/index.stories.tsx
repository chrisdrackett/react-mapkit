import React from 'react'

import { storiesOf } from '@storybook/react'

import { Map, MapkitProvider } from '../src'
import devToken from '../devToken'

storiesOf('Use', module)
  .add('with a provider', () => (
    <MapkitProvider tokenOrCallback={devToken}>
      <Map />
    </MapkitProvider>
  ))
  .add('alone', () => <Map tokenOrCallback={devToken} />)
