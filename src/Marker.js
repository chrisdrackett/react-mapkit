// @flow

import * as React from 'react'
import type MapKitType, {
  MarkerAnnotationConstructorOptions,
  Map,
  Annotation,
} from 'mapkit'

declare var mapkit: MapKitType

import { MapKitContext } from './index'

type Props = MarkerAnnotationConstructorOptions & {
  map: Map,
  latitude: number,
  longitude: number,
}

class Marker extends React.Component<Props> {
  marker: Annotation

  constructor(props: Props) {
    super(props)

    this.marker = new mapkit.MarkerAnnotation(
      new mapkit.Coordinate(props.latitude, props.longitude),
    )

    this.props.map.addAnnotation(this.marker)
  }

  shouldComponentUpdate(nextProps: Props) {
    if (
      this.props.latitude !== nextProps.latitude ||
      this.props.longitude !== nextProps.longitude
    ) {
      this.marker.coordinate = new mapkit.Coordinate(
        nextProps.latitude,
        nextProps.longitude,
      )
    }
    return false
  }

  render() {
    return null
  }
}

export default (props: Props) => (
  <MapKitContext.Consumer>
    {(map) => <Marker {...props} map={map} />}
  </MapKitContext.Consumer>
)
