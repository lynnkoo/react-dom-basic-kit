import React from 'react'
import { useToggleToast, Container } from '../containers/Container'
import { useToggleModal } from '../containers/ModalLayer'
import { Modal } from '../components/Modal'

export const ToggleToastComponent = () => {
  const toggleToast = useToggleToast('toggle toast')
  return <div onClick={toggleToast}>Toggle Toast Test</div>
}

export const ToggleModalComponent = () => {
  const toggleModal = useToggleModal((mProps: any) => (
    <Modal {...mProps} blankClose>
      <div>Toggle Modal Test</div>
    </Modal>
  ))
  return <div onClick={toggleModal}>Toggle Modal Test</div>
}

export const ToggleToast = () => {
  return (
    <Container>
      <ToggleToastComponent />
    </Container>
  )
}
export const ToggleModal = () => {
  return (
    <Container>
      <ToggleModalComponent />
    </Container>
  )
}
