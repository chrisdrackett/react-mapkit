// @flow

import * as React from 'react'
import load from 'little-loader'

type Props = {
  /**
   * Prop Description
   */
  callbackUrl?: string,
  token?: string,
}

type State = {
  mapKitIsReady: boolean,
  makKitIsStarted: boolean,
}

export default class ComponentTemplate extends React.Component<Props, State> {
  map = null

  state = {
    mapKitIsReady: false,
    makKitIsStarted: false,
  }

  constructor(props: Props) {
    super(props)

    load(
      'https://cdn.apple-mapkit.com/mk/5.x.x/mapkit.js',
      function(err) {
        this.setState({ mapKitIsReady: true })
      },
      this,
    )
  }

  componentDidUpdate() {
    if (this.state.mapKitIsReady && !this.state.makKitIsStarted) {
      mapkit.init({
        authorizationCallback: (done) => {
          if (this.props.callbackUrl) {
            fetch(this.props.callbackUrl)
              .then((res) => res.text())
              .then(done)
          } else {
            done(this.props.token)
          }
        },
      })

      this.map = new mapkit.Map('map')

      this.setState({ makKitIsStarted: true })
    }
  }

  render() {
    const { callbackUrl, token, ...otherProps } = this.props

    return <div id="map" {...otherProps} />
  }
}
