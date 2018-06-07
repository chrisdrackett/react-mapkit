# React Mapkit 🗺️

[![npm version](https://badge.fury.io/js/react-mapkit.svg)](https://badge.fury.io/js/react-mapkit)
[![Dependency Status](https://david-dm.org/chrisdrackett/react-mapkit.svg)](https://david-dm.org/chrisdrackett/react-mapkit)

## Install

`yarn add react-mapkit`

### Key generation (optional)

This package includes a script you can use to generate a JWT key. To use add your private key from Apple to the keygen folder as `key.p8` then run:

`yarn keygen`

follow the prompts. The generated key can then be used for your app. If you want to generate short keys you can refer to the script in keygen to get an idea of how to do this in node.

## MapKit Component

This is the component that will render a map. You'll need to provide either a `callbackUrl` or a `token` for this component to work.

### Props

#### `callbackUrl`: string

a callback url that returns a JWT. More info [in Apple's docs](https://developer.apple.com/documentation/mapkitjs/mapkit/2974045-init).

#### `token`: string

a JWT token to use. Use this when using a long-lived token. In this case its probably best to make sure you set an `origin` in your token.
