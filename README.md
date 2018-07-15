# React Mapkit 🗺️

[![npm version](https://badge.fury.io/js/react-mapkit.svg)](https://badge.fury.io/js/react-mapkit)
[![Dependency Status](https://david-dm.org/chrisdrackett/react-mapkit.svg)](https://david-dm.org/chrisdrackett/react-mapkit)

### ⚠️ Note ⚠️

This project is still in development and is missing features (including being able to place anything other than markers on a map). Contributions are welcome!

See the [demo storybook](https://chrisdrackett.github.io/react-mapkit/?selectedStory=all%20props&full=0&addons=1&stories=1&panelRight=1&addonPanel=storybooks%2Fstorybook-addon-knobs)!

## Install

`yarn add react-mapkit`

### Key generation (optional)

This package includes a script you can use to generate a JWT key. To use add your private key from Apple to the keygen folder as `key.p8` then run:

`yarn keygen`

follow the prompts. The generated key can then be used for your app. If you want to generate short keys you can refer to the script in keygen to get an idea of how to do this in node.

## Storybook

This project contains a [storybook](https://storybook.js.org) that shows examples of how the component can be used. To use this storybook follow these steps:

1.  copy `devToken.js.rename` to `devToken.js`
2.  add a valid token from apple to `devToken.js`
3.  run `yarn` then `yarn storybook`
4.  visit the URL storybook gives you
5.  play with maps!

## MapKit Component

This is the component that will render a map. You'll need to provide either a `callbackUrl` or a `token` to the `tokenOrCallback` prop for this component to work.

### Default Props

You can set the initial view of the map using the props prefaced with `default`. Note that once the component has rendered changing these props (or `tokenOrCallback`) will not have any effect on the component.

If you want to programmatically change the rotation or viewport of the map after rendering this component can work with a function as children. For example, the following code will let you update the rotation of the map:

```js
<MapKit
  tokenOrCallback={devToken}
>
  {({ setRotation }) => {
    setRotation(<pass in a number here to set rotation>)
  }}
</MapKit>
```

There is an example of this in the projects storybook.
