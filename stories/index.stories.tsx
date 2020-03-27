import React, { useState } from 'react'

import { storiesOf } from '@storybook/react'

import {
  Map,
  MapkitProvider,
  useMap,
  Marker,
  CircleOverlay,
  PolygonOverlay,
  PolylineOverlay,
  Directions,
} from '../src'
import devToken from '../devToken'

const UseMapExample = () => {
  const { setRotation, mapProps } = useMap()

  return (
    <>
      <button onClick={() => setRotation(Math.random() * 360)}>rotate!</button>
      <Map {...mapProps} />
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

storiesOf('Markers', module).add('adding a marker', () => (
  <Map
    tokenOrCallback={devToken}
    region={{
      latitude: 47.6754,
      longitude: -122.2084,
      latitudeSpan: 0.006,
      longitudeSpan: 0.006,
    }}
  >
    <Marker latitude={47.6754} longitude={-122.2084} />
    <Marker
      latitude={47.6764}
      longitude={-122.2073}
      title={'Tea here!'}
      subtitle={'coffee too ☕'}
    />
  </Map>
))

storiesOf('Overlays', module)
  .add('Circles', () => (
    <Map
      tokenOrCallback={devToken}
      region={{
        latitude: 47.6754,
        longitude: -122.2084,
        latitudeSpan: 0.006,
        longitudeSpan: 0.006,
      }}
    >
      <CircleOverlay
        latitude={47.6754}
        longitude={-122.2084}
        radius={100}
        styles={{ fillColor: 'red', strokeColor: 'red' }}
      />
    </Map>
  ))
  .add('Polygons', () => (
    <Map
      tokenOrCallback={devToken}
      region={{
        latitude: 47.6754,
        longitude: -122.2084,
        latitudeSpan: 0.006,
        longitudeSpan: 0.006,
      }}
    >
      <PolygonOverlay
        points={[
          [47.6754, -122.2084],
          [47.6764, -122.2073],
          [47.6747, -122.2061],
        ]}
      />
    </Map>
  ))
  .add('Polyline', () => (
    <Map
      tokenOrCallback={devToken}
      region={{
        latitude: 47.6754,
        longitude: -122.2084,
        latitudeSpan: 0.006,
        longitudeSpan: 0.006,
      }}
    >
      <PolylineOverlay
        points={[
          [47.6754, -122.2084],
          [47.6764, -122.2073],
        ]}
        styles={{ lineWidth: 4 }}
      />
    </Map>
  ))

storiesOf('Directions', module)
  .add('Driving', () => (
    <Map
      tokenOrCallback={devToken}
      region={{
        latitude: 47.6754,
        longitude: -122.2084,
        latitudeSpan: 0.006,
        longitudeSpan: 0.006,
      }}
    >
      <Directions
        origin={[47.6754, -122.2084]}
        destination={[47.68, -122.2135]}
        transportType="Automobile"
        style={{ lineWidth: 3 }}
      />
    </Map>
  ))
  .add('Walking', () => (
    <Map
      tokenOrCallback={devToken}
      region={{
        latitude: 47.6754,
        longitude: -122.2084,
        latitudeSpan: 0.006,
        longitudeSpan: 0.006,
      }}
    >
      <Directions
        origin={[47.6754, -122.2084]}
        destination={[47.68, -122.2135]}
        transportType="Walking"
        style={{ lineWidth: 3 }}
      />
    </Map>
  ))
  .add('Getting route details', () => {
    const [time, setTime] = useState(0)
    const [distance, setDistance] = useState(0)
    return (
      <>
        <p>
          It will take {time} seconds to walk {distance} meters
        </p>
        <Map
          tokenOrCallback={devToken}
          region={{
            latitude: 47.6754,
            longitude: -122.2084,
            latitudeSpan: 0.006,
            longitudeSpan: 0.006,
          }}
        >
          <Directions
            origin={[47.6754, -122.2084]}
            destination={[47.68, -122.2135]}
            transportType="Walking"
            style={{ lineWidth: 3 }}
            routeDetails={({ expectedTravelTime, distance }) => {
              setTime(expectedTravelTime)
              setDistance(distance)
            }}
          />
        </Map>
      </>
    )
  })
