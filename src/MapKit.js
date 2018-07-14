// @flow

import * as React from 'react'
import load from 'little-loader'
import invariant from 'invariant'

import ErrorBoundry from './ErrorBoundry'

import type MapKitType, {
  FeatureVisibility,
  MapType,
  Map,
  PaddingOptions,
  Coordinate,
  CoordinateSpan,
  MapConstructorOptions,
  CoordinateRegion,
} from 'mapkit'
declare var mapkit: MapKitType

type NumberTuple = [number, number]
type Rect = [number, number, number, number]
type PaddingType = number | PaddingOptions

type Props = {
  // Init Props
  // ⚠️ These props are used for setup and can't be changed once set.
  // ⚠️ Pick between callbackUrl or token.
  callbackUrl?: string,
  token?: string,

  // Default View of the Map
  defaultCenter?: NumberTuple,
  defaultSpan?: NumberTuple,
  defaultMapRect?: Rect,
  defaultRotation?: number,

  // Interaction Properties
  isRotationEnabled: boolean,
  isScrollEnabled: boolean,
  isZoomEnabled: boolean,

  // Should programatic view / rotation changes be animated?
  animateViewChange: boolean,
  animateRotationChange: boolean,

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

  children: React.Node,
}

type State = {
  mapKitIsReady: boolean,
}

const defaultPropsErrorText =
  "Either a `callbackUrl` or `token` is required for the `MapKit` component. One of these props must be set on init and can't be updated after the component is setup."

export const MapKitContext = React.createContext() // todo: <Map | void>

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

    // Create the 🗺️!
    this.map = new mapkit.Map('map')

    // Setup Default Map Options
    // in theory this should be possible to set via the above via:
    // https://developer.apple.com/documentation/mapkitjs/mapconstructoroptions
    // but it is not working as expected.
    //
    // radar: https://bugreport.apple.com/web/?problemID=41190232

    if (props.defaultRotation) this.map.rotation = props.defaultRotation

    if (props.defaultMapRect) {
      try {
        this.map.visibleMapRect = this.createMapRect(
          props.defaultMapRect[0],
          props.defaultMapRect[1],
          props.defaultMapRect[2],
          props.defaultMapRect[3],
        )
      } catch (e) {
        console.warn(e.message)
      }
    } else {
      let mapCenter = this.createCoordinate(0, 0)
      let mapSpan

      if (props.defaultCenter) {
        try {
          mapCenter = this.createCoordinate(
            props.defaultCenter[0],
            props.defaultCenter[1],
          )
        } catch (e) {
          console.warn(e.message)
        }

        if (props.defaultSpan) {
          try {
            mapSpan = this.createCoordinateSpan(
              props.defaultSpan[0],
              props.defaultSpan[1],
            )
          } catch (e) {
            console.warn(e.message)
          }
        }

        if (mapSpan) {
          // if we have a span we'll set a region
          this.map.region = this.createCoordinateRegion(mapCenter, mapSpan)
        } else {
          // otherwise we just set the center
          this.map.center = mapCenter
        }
      }
    }

    // Set Other Props
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

  createCoordinateRegion = (
    center: Coordinate,
    span: CoordinateSpan,
  ): CoordinateRegion => {
    return new mapkit.CoordinateRegion(center, span)
  }

  createMapPoint = (x: number, y: number) => {
    return new mapkit.MapPoint(x, y)
  }

  createMapRect = (x: number, y: number, width: number, height: number) => {
    return new mapkit.MapRect(x, y, width, height)
  }

  shouldComponentUpdate(nextProps: Props, nextState: State) {
    // for a lot of prop changes we're just making calls to mapKit so we have no need to re-render
    let ComponentShouldUpdate = false

    // might be needed when we start adding markers, but for now not a thing we do
    if (
      this.props.children !== nextProps.children ||
      this.state.mapKitIsReady != nextState.mapKitIsReady
    ) {
      ComponentShouldUpdate = true
    }

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

      defaultCenter,
      defaultSpan,
      defaultMapRect,
      defaultRotation,

      animateViewChange,
      animateRotationChange,

      isRotationEnabled,
      isScrollEnabled,
      isZoomEnabled,

      showsUserLocation,
      tracksUserLocation,

      children,
      ...otherProps
    } = this.props

    return (
      <div id="map" {...otherProps}>
        <MapKitContext.Provider value={this.map}>
          {this.state.mapKitIsReady && children}
        </MapKitContext.Provider>
      </div>
    )
  }
}

export default (props: Props) => (
  <ErrorBoundry errorText={defaultPropsErrorText}>
    <MapKit {...props} />
  </ErrorBoundry>
)
