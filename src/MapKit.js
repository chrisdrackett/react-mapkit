// @flow

import * as React from 'react'
import load from 'little-loader'

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
  // ⚠️ This prop is used for setup and can't be changed once set.
  // ⚠️ Pick between callbackUrl or token.
  // https://developer.apple.com/documentation/mapkitjs/mapkit/2974045-init
  tokenOrCallback: string,

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

  children:
    | React.Node
    | (({
        setRotation: (number) => void,
        setCenter: (NumberTuple) => void,
      }) => React.Node),
}

type State = {
  mapKitIsReady: boolean,
}

export const MapKitContext = React.createContext()

export default class MapKit extends React.Component<Props, State> {
  mapRef: ?React.Ref<'div'>
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

    this.mapRef = React.createRef()

    load(
      'https://cdn.apple-mapkit.com/mk/5.x.x/mapkit.js',
      () => this.initMap(props),
      this,
    )
  }

  initMap = (props: Props) => {
    const isCallback = props.tokenOrCallback.includes('/')

    // init mapkit
    mapkit.init({
      authorizationCallback: (done) => {
        if (isCallback) {
          fetch(props.tokenOrCallback)
            .then((res) => res.text())
            .then(done)
        } else {
          done(props.tokenOrCallback)
        }
      },
    })

    // Create the 🗺️!
    this.map = new mapkit.Map(this.mapRef.current)

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
    // let ComponentShouldUpdate = false
    //
    // // might be needed when we start adding markers, but for now not a thing we do
    // if (this.state.mapKitIsReady != nextState.mapKitIsReady) {
    //   ComponentShouldUpdate = true
    // }

    if (this.state.mapKitIsReady) {
      this.updateMapProps(nextProps)
    }

    return true
  }

  componentWillUnmount() {
    this.map.destroy()
  }

  setRotation = (rotation: number) => {
    this.map.setRotationAnimated(rotation, this.props.animateRotationChange)
  }

  setCenter = ([lat, lng]: NumberTuple) => {
    this.map.setCenterAnimated(
      this.createCoordinate(lat, lng),
      this.props.animateViewChange,
    )
  }

  render() {
    const {
      tokenOrCallback,

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
      <div ref={this.mapRef} {...otherProps}>
        <MapKitContext.Provider value={this.map}>
          {this.state.mapKitIsReady &&
            (typeof children === 'function'
              ? children({
                  setRotation: this.setRotation,
                  setCenter: this.setCenter,
                })
              : children)}
        </MapKitContext.Provider>
      </div>
    )
  }
}
