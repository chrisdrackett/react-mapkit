import React from 'react'

import { storiesOf } from '@storybook/react'
import { text, boolean, number, select } from '@storybook/addon-knobs/react'

import devToken from '../devToken'
import MapKit from '../src'

storiesOf('MapKit', module)
  .add('all props', () => (
    <MapKit
      style={{ width: '100vw', height: '100vh' }}
      token={text('token', devToken)}
      mapType={select(
        'mapType',
        { standard: 'standard', satellite: 'satellite', hybrid: 'hybrid' },
        'standard',
      )}
      padding={number('padding', 0)}
      showsCompass={select(
        'showsCompass',
        { adaptive: 'adaptive', hidden: 'hidden', visible: 'visible' },
        'adaptive',
      )}
      showsMapTypeControl={boolean('showsMapTypeControl', true)}
      showsZoomControl={boolean('showsZoomControl', true)}
      showsUserLocationControl={boolean('showsUserLocationControl', false)}
      showsPointsOfInterest={boolean('showsPointsOfInterest', true)}
      showsScale={select(
        'showsScale',
        { adaptive: 'adaptive', hidden: 'hidden', visible: 'visible' },
        'hidden',
      )}
      tintColor={text('tintColor', '')}
      center={[
        number('latitude', 47.6063889),
        number('longitude', -122.3308333),
      ]}
      animateCenterChange={boolean('animateCenterChange', true)}
      isRotationEnabled={boolean('isRotationEnabled', true)}
      isScrollEnabled={boolean('isScrollEnabled', true)}
      isZoomEnabled={boolean('isZoomEnabled', true)}
    />
  ))
  .add('individual padding values', () => (
    <MapKit
      style={{ width: '100vw', height: '100vh' }}
      token={devToken}
      padding={{
        top: number('top', 0),
        right: number('right', 0),
        bottom: number('bottom', 0),
        left: number('left', 0),
      }}
    />
  ))
