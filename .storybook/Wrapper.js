import React from 'react'

export const Wrapper = (storyFn) => (
  <div style={{ width: '100vw', height: '100vh' }}>{storyFn()}</div>
)
