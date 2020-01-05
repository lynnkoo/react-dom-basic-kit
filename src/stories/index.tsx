import React from 'react'
import { storiesOf } from '@storybook/react'
import { ToggleModal, ToggleToast } from './Container'

storiesOf('Container', module)
  .add('toggle toast', () => <ToggleToast />)
  .add('toggle modal', () => <ToggleModal />)
