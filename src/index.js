// @flow

import type MapKitType, {
  FeatureVisibility,
  MapType,
  Map,
  PaddingOptions,
  Coordinate,
  CoordinateSpan,
} from 'mapkit'
declare var mapkit: MapKitType

import * as React from 'react'
import load from 'little-loader'
import invariant from 'invariant'

import ErrorBoundry from './ErrorBoundry'

type NumberTuple = [number, number]
type Rect = [number, number, number, number]
type PaddingType = number | PaddingOptions

type Props = {
  // Init Props
  // ⚠️ These props are used for setup and can't be changed once set.
  // ⚠️ Pick between callbackUrl or token.
  callbackUrl?: string,
  token?: string,

  // Interaction Properties
  isRotationEnabled: boolean,
  isScrollEnabled: boolean,
  isZoomEnabled: boolean,

  // Manipulating the Visible Portion of the Map
  center?: NumberTuple,
  span?: NumberTuple,
  mapRect?: Rect,
  animateViewChange: boolean,
  rotation?: number,
  animateRotationChange: boolean,
  // visibleMapRect

  // Configuring the Map's Appearance
  mapType: MapType,
  padding: PaddingType,
  showsCompass: FeatureVisibility,
  showsMapTypeControl: boolean,
  showsZoomControl: boolean,
  showsUserLocationControl: boolean,
  showsPointsOfInterest: boolean,
  showsScale: FeatureVisibility,
  tintColor?: string,

  // Annotations
  // todo

  // Overlays
  // todo

  // TileOverlays
  // todo

  // Displaying the User's Location
  showsUserLocation: boolean,
  tracksUserLocation: boolean,
}

type State = {
  mapKitIsReady: boolean,
}

const defaultPropsErrorText =
  "Either a `callbackUrl` or `token` is required for the `MapKit` component. One of these props must be set on init and can't be updated after the component is setup."

class MapKit extends React.Component<Props, State> {
  map: Map

  static defaultProps = {
    mapType: 'standard',
    padding: 0,
    showsCompass: 'adaptive',
    showsMapTypeControl: true,
    showsZoomControl: true,
    showsUserLocationControl: false,
    showsPointsOfInterest: true,
    showsScale: 'hidden',
    animateViewChange: true,
    isRotationEnabled: true,
    isScrollEnabled: true,
    isZoomEnabled: true,

    showsUserLocation: false,
    tracksUserLocation: false,

    rotation: 0,
    animateRotationChange: true,
  }

  state = {
    mapKitIsReady: false,
  }

  constructor(props: Props) {
    super(props)

    this.checkProps(props)

    load(
      'https://cdn.apple-mapkit.com/mk/5.x.x/mapkit.js',
      () => this.initMap(props),
      this,
    )
  }

  initMap = (props: Props) => {
    if (props.callbackUrl || props.token) {
      mapkit.init({
        authorizationCallback: (done) => {
          if (props.callbackUrl) {
            fetch(props.callbackUrl)
              .then((res) => res.text())
              .then(done)
          }
          if (props.token) {
            done(props.token)
          }
        },
      })
    } else {
      throw defaultPropsErrorText
    }

    this.map = new mapkit.Map('map')

    this.updateMapProps(props)

    this.setState({ mapKitIsReady: true })
  }

  checkProps = (props: Props) => {
    invariant(props.callbackUrl || props.token, defaultPropsErrorText)
  }

  updateMapProps = (props: Props) => {
    this.map.showsMapTypeControl = props.showsMapTypeControl
    this.map.mapType = props.mapType
    this.map.padding = this.createPadding(props.padding)
    this.map.showsCompass = props.showsCompass
    this.map.showsMapTypeControl = props.showsMapTypeControl
    this.map.showsZoomControl = props.showsZoomControl
    this.map.showsUserLocationControl = props.showsUserLocationControl
    this.map.showsPointsOfInterest = props.showsPointsOfInterest
    this.map.showsScale = props.showsScale
    this.map.tintColor = props.tintColor
    this.map.isRotationEnabled = props.isRotationEnabled
    this.map.isScrollEnabled = props.isScrollEnabled
    this.map.isZoomEnabled = props.isZoomEnabled
    this.map.showsUserLocation = props.showsUserLocation
    this.map.tracksUserLocation = props.tracksUserLocation

    // Map View Area

    if (props.mapRect) {
      let newRect
      try {
        newRect = this.createMapRect(
          props.mapRect[0],
          props.mapRect[1],
          props.mapRect[2],
          props.mapRect[3],
        )
      } catch (e) {
        console.warn(e.message)
      }
      if (newRect && !newRect.equals(this.map.visibleMapRect)) {
        this.map.setVisibleMapRectAnimated(newRect, props.animateViewChange)
      }
    } else {
      let newCenter = this.createCoordinate(0, 0)
      let newSpan

      if (props.center) {
        try {
          newCenter = this.createCoordinate(props.center[0], props.center[1])
        } catch (e) {
          console.warn(e.message)
        }

        if (props.span) {
          try {
            newSpan = this.createCoordinateSpan(props.span[0], props.span[1])
          } catch (e) {
            console.warn(e.message)
          }
        }

        if (newSpan) {
          // if we have a span we'll set a region
          const newRegion = this.createCoordinateRegion(newCenter, newSpan)

          if (!newRegion.equals(this.map.region)) {
            this.map.setRegionAnimated(newRegion, props.animateViewChange)
          }
        } else {
          // otherwise we just set the center
          if (!newCenter.equals(this.map.center)) {
            this.map.setCenterAnimated(newCenter, props.animateViewChange)
          }
        }
      }
    }

    // Map Rotation
    const newRotation = props.rotation ? props.rotation : 0

    if (!this.map.rotation !== newRotation) {
      this.map.setRotationAnimated(newRotation, props.animateRotationChange)
    }

    // Map Region
  }

  createPadding = (padding: PaddingType) => {
    return new mapkit.Padding(
      typeof padding === 'number'
        ? {
            top: padding,
            right: padding,
            bottom: padding,
            left: padding,
          }
        : padding,
    )
  }

  createCoordinate = (latitude: number, longitude: number) => {
    return new mapkit.Coordinate(latitude, longitude)
  }

  createCoordinateSpan = (latitudeDelta: number, longitudeDelta: number) => {
    return new mapkit.CoordinateSpan(latitudeDelta, longitudeDelta)
  }

  createCoordinateRegion = (center: Coordinate, span: CoordinateSpan) => {
    return new mapkit.CoordinateRegion(center, span)
  }

  createMapPoint = (x: number, y: number) => {
    return new mapkit.MapPoint(x, y)
  }

  createMapRect = (x: number, y: number, width: number, height: number) => {
    return new mapkit.MapRect(x, y, width, height)
  }

  shouldComponentUpdate(nextProps: Props, nextState: State) {
    // make sure we have at least one init prop
    this.checkProps(nextProps)

    // if our init props have changed, throw an error, we currently don't re-init the map
    if (
      this.props.token !== nextProps.token ||
      this.props.callbackUrl !== nextProps.callbackUrl
    ) {
      invariant(false, defaultPropsErrorText)
    }

    // for a lot of prop changes we're just making calls to mapKit so we have no need to re-render
    let ComponentShouldUpdate = false

    // might be needed when we start adding markers, but for now not a thing we do
    // if (this.props.children !== nextProps.children) {
    //   ComponentShouldUpdate = true
    // }

    if (this.state.mapKitIsReady) {
      this.updateMapProps(nextProps)
    }

    return ComponentShouldUpdate
  }

  componentWillUnmount() {
    this.map.destroy()
  }

  render() {
    const {
      callbackUrl,
      token,

      mapType,
      padding,
      showsCompass,
      showsMapTypeControl,
      showsZoomControl,
      showsUserLocationControl,
      showsPointsOfInterest,
      showsScale,
      tintColor,

      center,
      span,
      mapRect,
      animateViewChange,

      rotation,
      animateRotationChange,

      isRotationEnabled,
      isScrollEnabled,
      isZoomEnabled,

      showsUserLocation,
      tracksUserLocation,

      ...otherProps
    } = this.props

    return <div id="map" {...otherProps} />
  }
}

export default (props: Props) => (
  <ErrorBoundry errorText={defaultPropsErrorText}>
    <MapKit {...props} />
  </ErrorBoundry>
)
