// @flow

import * as React from 'react'
import load from 'little-loader'
import invariant from 'invariant'

import ErrorBoundry from './ErrorBoundry'

type Props = {
  callbackUrl?: string,
  token?: string,
  tintColor?: string,
  showsUserLocationControl: boolean,
}

type State = {
  mapKitIsReady: boolean,
  makKitIsStarted: boolean,
}

const defaultPropsErrorText =
  "Either a `callbackUrl` or `token` is required for the `MapKit` component. One of these props must be set on init and can't be updated after the component is setup."

class MapKit extends React.Component<Props, State> {
  map = null

  static defaultProps = {
    showsUserLocationControl: false,
  }

  state = {
    mapKitIsReady: false,
    makKitIsStarted: false,
  }

  checkProps = (props: Props) => {
    invariant(props.callbackUrl || props.token, defaultPropsErrorText)
  }

  initMap = (props: Props) => {
    mapkit.init({
      authorizationCallback: (done) => {
        props.callbackUrl
          ? fetch(props.callbackUrl)
              .then((res) => res.text())
              .then(done)
          : done(props.token)
      },
    })

    this.map = new mapkit.Map('map')

    this.setState({ mapKitIsReady: true })
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

  shouldComponentUpdate(nextProps: Props, nextState: State) {
    // make sure we have at least one init prop
    this.checkProps(nextProps)

    let ComponentShouldUpdate = false

    // if our init props have changed, re-init the map
    if (
      this.props.token !== nextProps.token ||
      this.props.callbackUrl !== nextProps.callbackUrl
    ) {
      invariant(false, defaultPropsErrorText)
    }

    if (this.props.children !== nextProps.children) {
      ComponentShouldUpdate = true
    }

    if (this.state.mapKitIsReady) {
      // Update map based on props
      this.map.tintColor = nextProps.tintColor
      this.map.showsUserLocationControl = nextProps.showsUserLocationControl
    }

    return ComponentShouldUpdate
  }

  render() {
    const {
      callbackUrl,
      token,
      showsUserLocationControl,
      tintColor,
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
