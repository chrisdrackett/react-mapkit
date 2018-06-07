import * as React from 'react'
import { render } from 'react-dom'
import Markdown from 'react-markdown'
import load from 'little-loader'

import Typography from 'typography'
import usWebDesignStandardsTheme from 'typography-theme-us-web-design-standards'

import { css } from 'glamor'

import MapKit from '../../src'

css.global('html, body', { padding: 0, margin: 0 })
css.global('body', {
  backgroundColor: '#18d7fd',
  fontFamily:
    'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif',
})

const typography = new Typography({
  baseFontSize: '18px',
  baseLineHeight: 1.5,
})
typography.injectStyles()

const content = `
# React MapKit 🗺️

## Intro

This is a demo page for [React MapKit](https://github.com/chrisdrackett/react-mapkit), a react wrapper for Apple Maps (MapKit.js)

## Uses

Todo
`

class Demo extends React.Component {
  render() {
    const white = '#ffffff'

    const styles = {
      grid: {
        backgroundColor: white,

        height: '100%',
        display: 'grid',
        gridTemplateColumns: '360px auto',
        gridTemplateRows: 'auto',
        gridTemplateAreas: '"sidebar content"',
      },
      sidebar: {
        gridArea: 'sidebar',

        padding: 16,
      },
      content: {
        gridArea: 'content',

        height: '100vh',
      },
    }

    return (
      <div {...css(styles.grid)}>
        <section {...css(styles.sidebar)}>
          <Markdown source={content} />
        </section>
        <MapKit
          {...css(styles.content)}
          token="eyJhbGciOiJFUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IkY2N0c4OTM3RjUifQ.eyJpYXQiOjE1MjgzNTQwOTYuNzI2LCJpc3MiOiJHOERBODY0VVlLIiwib3JpZ2luIjoiaHR0cHM6Ly9jaHJpc2RyYWNrZXR0LmdpdGh1Yi5pbyJ9.Z9FW9wYDO0AfOyWnf0d3vLGbu62GTu7WKtxPXAuVFiimr1DR4JN_s6YB8wG9kvZl4ACp4j857U4bOV5NIi55HA"
        />
      </div>
    )
  }
}

render(<Demo />, document.querySelector('#demo'))
