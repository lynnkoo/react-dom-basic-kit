import React from 'react'
import { storiesOf } from '@storybook/react'
import { useToggleToast, Container } from '../containers/Container'

const ToastTest = () => {
  const toggleToast = useToggleToast('test')
  return <div onClick={toggleToast}>Toggle Test</div>
}

storiesOf('Container', module)
  .add('with text', () => (
    // 一个 add 表示添加一个 story
    <Container>
      <ToastTest />
    </Container>
  ))
  .add('with some emoji', () => (
    // 这里是另一个 story
    <div>
      <span role="img" aria-label="so cool">
        😀 😎 👍 💯
      </span>
    </div>
  ))
