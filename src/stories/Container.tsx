import React from 'react'
import {} from '../containers/ModalLayer'
import { Modal } from '../components/Modal'
import {
  useAppContext,
  useToggleToast,
  useThemeStyles,
  Container,
  useToggleModal,
} from '../index'

import styles from './styles/Container.module.scss'
import styles_dark from './styles/Container-dark.module.scss'

function useStyles() {
  return useThemeStyles(styles, { dark: styles_dark })
}

export const ToggleToastComponent = () => {
  const toggleToast = useToggleToast()
  const toggleMessage = () => {
    toggleToast('text')
  }
  return <div onClick={toggleMessage}>Toggle Toast Test</div>
}

export const ToggleToast = () => {
  return (
    <Container>
      <ToggleToastComponent />
    </Container>
  )
}

const ThemeingText = () => {
  const cx = useStyles()
  return <div className={cx('test')}>Theme test Text</div>
}

export const ToggleModalComponent = () => {
  const cx = useStyles()
  const { theme, setTheme } = useAppContext()
  const toggleModal = useToggleModal(
    (mProps: any) => (
      <Modal blankClose {...mProps}>
        <div className={cx('test')}>Toggle Modal Test</div>
      </Modal>
    ),
    [theme],
  )
  const toDark = () => {
    setTheme('dark')
  }
  const clearTheme = () => {
    setTheme('')
  }
  return (
    <div>
      <div className={cx('test')} onClick={toggleModal}>
        Toggle Dialog Modal
      </div>
      <ThemeingText />
      <div onClick={toDark}>Toggle Dialog Modal</div>
      <div onClick={clearTheme}>Toggle Dialog Modal</div>
    </div>
  )
}

export const ToggleModal = () => {
  return (
    <Container>
      <ToggleModalComponent />
    </Container>
  )
}
