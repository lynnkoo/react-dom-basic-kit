import * as React from 'react'
export const AudioPlayer = () => {
  const [source, setSource] = React.useState('')
  if (!source) {
    return null
  }
  return React.createElement('audio', null)
}
