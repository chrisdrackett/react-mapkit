import React from 'react'

import { storiesOf } from '@storybook/react'
import { text, boolean, number } from '@storybook/addon-knobs/react'

import devToken from '../devToken'
import MapKit from '../src'

storiesOf('MapKit', module).add('with token', () => (
  <MapKit
    style={{ width: '100vw', height: '100vh' }}
    token={text('token', devToken)}
    tintColor={text('tintColor', undefined)}
  />
))
