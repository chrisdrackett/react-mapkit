import React from 'react'

import { storiesOf } from '@storybook/react'
import {
  text,
  boolean,
  number,
  select,
  button,
} from '@storybook/addon-knobs/react'

import devToken from '../devToken'
import { MapKit, Marker } from '../src'

storiesOf('MapKit', module)
  .add('Map Controls', () => (
    <MapKit
      style={{ width: '100vw', height: '100vh' }}
      tokenOrCallback={devToken}
      mapType={select(
        'mapType',
        { standard: 'standard', satellite: 'satellite', hybrid: 'hybrid' },
        'standard',
      )}
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
      isRotationEnabled={boolean('isRotationEnabled', true)}
      isScrollEnabled={boolean('isScrollEnabled', true)}
      isZoomEnabled={boolean('isZoomEnabled', true)}
      showsUserLocation={boolean('showsUserLocation', false)}
      tracksUserLocation={boolean('tracksUserLocation', false)}
    />
  ))
  .add('Map Padding (single)', () => (
    <MapKit
      style={{ width: '100vw', height: '100vh' }}
      tokenOrCallback={devToken}
      padding={number('padding', 0)}
    />
  ))
  .add('Map Padding (individual)', () => (
    <MapKit
      style={{ width: '100vw', height: '100vh' }}
      tokenOrCallback={devToken}
      padding={{
        top: number('padding top', 0),
        right: number('padding right', 0),
        bottom: number('padding bottom', 0),
        left: number('padding left', 0),
      }}
    />
  ))
  .add('Default Center and Rotation', () => (
    <MapKit
      style={{ width: '100vw', height: '100vh' }}
      tokenOrCallback={devToken}
      defaultRotation={30}
      defaultCenter={[47.6063889, -122.3308333]}
    />
  ))
  .add('Set Rotation or Center', () => {
    const propSetter = ({ setRotation, setCenter }) => {
      setRotation(number('rotation', 0) || 0)
      setCenter([
        number('center latitude', 47.6063889) || 47.6063889,
        number('center longitude', -122.3308333) || -122.3308333,
      ])
    }

    return (
      <MapKit
        style={{ width: '100vw', height: '100vh' }}
        tokenOrCallback={devToken}
        animateRotationChange={boolean('animateRotationChange', true)}
      >
        {propSetter}
      </MapKit>
    )
  })
  // .add('View (Center and Span)', () => (
  //   <MapKit
  //     style={{ width: '100vw', height: '100vh' }}
  //     tokenOrCallback={devToken}
  //     center={[
  //       number('center latitude', 47.6063889),
  //       number('center longitude', -122.3308333),
  //     ]}
  //     span={[
  //       number('span latitude delta', 0.016),
  //       number('span longitude delta', 0.016),
  //     ]}
  //     animateViewChange={boolean('animateViewChange', true)}
  //   />
  // ))
  // .add('View (MapRect)', () => (
  //   <MapKit
  //     style={{ width: '100vw', height: '100vh' }}
  //     tokenOrCallback={devToken}
  //     mapRect={[
  //       number('x', 0.155),
  //       number('y', 0.345),
  //       number('width', 0.03),
  //       number('height', 0.04),
  //     ]}
  //     animateViewChange={boolean('animateViewChange', true)}
  //   />
  // ))
  .add('Markers', () => (
    <MapKit
      style={{ width: '100vw', height: '100vh' }}
      tokenOrCallback={devToken}
      center={[47.6063889, -122.3308333]}
      span={[0.016, 0.016]}
    >
      <Marker
        latitude={number('marker latitune', 47.6063889)}
        longitude={number('marker longitude', -122.3308333)}
        title={text('title', 'marker title')}
        subtitle={text('subtitle', 'marker subtitle')}
        glyphText={text('glyphText', '')}
        color={text('color', '#ff5b40')}
        glyphColor={text('glyphColor', 'white')}
      />
    </MapKit>
  ))
