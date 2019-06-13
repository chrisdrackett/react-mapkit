import React from 'react'

import { storiesOf } from '@storybook/react'

import devToken from '../devToken'
import { MapKit } from '../src'

storiesOf('MapKit', module).add('Map Controls', () => (
  <MapKit tokenOrCallback={devToken} />
))
