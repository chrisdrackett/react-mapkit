// @flow

import * as React from 'react'

type Props = {
  errorText: string,
  children: React.Node,
}

type State = {
  hasError: boolean,
}

export default class ErrorBoundary extends React.Component<Props, State> {
  state = { hasError: false }

  componentDidCatch() {
    this.setState({ hasError: true })
  }

  render() {
    if (this.state.hasError) {
      return <h1>{this.props.errorText}</h1>
    }
    return this.props.children
  }
}
