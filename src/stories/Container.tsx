import React from 'react'
import { useToggleToast, Container } from '../containers/Container'
import { useToggleModal } from '../containers/ModalLayer'
import { Modal } from '../components/Modal'

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

export const ToggleModalComponent = () => {
  const toggleModal = useToggleModal((mProps: any) => (
    <Modal blankClose {...mProps}>
      <div>Toggle Modal Test</div>
    </Modal>
  ))
  return <div onClick={toggleModal}>Toggle Dialog Modal</div>
}

export const ToggleModal = () => {
  return (
    <Container>
      <ToggleModalComponent />
    </Container>
  )
}
