import React from 'react'

import { storiesOf } from '@storybook/react'
import { number } from '@storybook/addon-knobs'

import { useMap } from '../'
import devToken from '../devToken'

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

const Map = () => {
  const { map, mapkit, mapRef } = useMap(devToken)

  React.useEffect(() => {
    if (map && mapkit) {
      map.colorScheme = mapkit.Map.ColorSchemes.Dark
    }
  }, [map, mapkit])

  return <div ref={mapRef} style={{ width: '100%', height: '100%' }} />
}

storiesOf('map access', module).add('colorScheme', () => <Map />)

const MapWithKnobs = () => {
  const { mapRef, setRotation } = useMap(devToken)

  const rotation = number('rotation', 0)

  React.useEffect(() => {
    setRotation(rotation)
  }, [rotation, setRotation])

  return <div ref={mapRef} style={{ width: '100%', height: '100%' }} />
}

storiesOf('map setters', module).add('map setters', () => <MapWithKnobs />)
