import React, { useState } from 'react'
import { Map, Directions } from '../src'
import devToken from '../devToken'

export function RouteDetailExample() {
  const [time, setTime] = useState(0)
  const [distance, setDistance] = useState(0)
  console.log(mapkit.Directions.Transport.Automobile)

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
          transportType={mapkit.Directions.Transport.Walking}
          style={{ lineWidth: 3 }}
          onRouteUpdate={({ expectedTravelTime, distance }) => {
            setTime(expectedTravelTime)
            setDistance(distance)
          }}
        />
      </Map>
    </>
  )
}
