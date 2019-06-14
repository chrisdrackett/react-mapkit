import { configure, addDecorator } from '@storybook/react'
import { withKnobs } from '@storybook/addon-knobs/react'

import { Wrapper } from './Wrapper'

// automatically import all files ending in *.stories.js
const req = require.context('../stories', true, /.stories.tsx$/)
function loadStories() {
  req.keys().forEach((filename) => req(filename))
}

addDecorator(withKnobs)
addDecorator(Wrapper)

configure(loadStories, module)
