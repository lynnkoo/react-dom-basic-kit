import * as React from 'react'
import uuidv4 from 'uuid/v4'
import { useLocation } from 'react-router-dom'
const TOGGLED_MODALES = {}
export function asModalProps(props) {
  return {
    isOpen: props.isOpen,
    onClose: props.onClose,
    onRemove: props.onRemove,
  }
}
export const ModalContext = React.createContext(null)
function useUpdateModal(modalId, modal, deps) {
  const { updateModal } = React.useContext(ModalContext)
  React.useEffect(() => {
    if (modalId) {
      updateModal(modalId, modal)
    }
  }, [modalId, modal, ...deps])
}
export function useToggleModal(modal, deps = []) {
  const { showModal, closeModal } = React.useContext(ModalContext)
  const [activeModal, setActiveModal] = React.useState(null)
  const memoModal = React.useMemo(() => modal, deps)
  const toggleModal = React.useCallback(() => {
    if (activeModal && !TOGGLED_MODALES[activeModal]) {
      setActiveModal(null)
      closeModal(activeModal)
    } else {
      if (TOGGLED_MODALES[activeModal]) {
        delete TOGGLED_MODALES[activeModal]
      }
      const modalId = showModal(memoModal)
      setActiveModal(modalId)
    }
  }, [activeModal, ...deps])
  useUpdateModal(activeModal, memoModal, deps)
  return toggleModal
}
export function useModal(modal, deps = []) {
  const { showModal, closeModal } = React.useContext(ModalContext)
  const [activeModal, setActiveModal] = React.useState()
  const memoModal = React.useMemo(() => modal, deps)
  const onShowModal = React.useCallback(() => {
    const modalId = showModal(memoModal)
    setActiveModal(modalId)
  }, deps)
  const onCloseModal = React.useCallback(() => {
    setActiveModal(null)
    closeModal(activeModal)
  }, [activeModal])
  useUpdateModal(activeModal, memoModal, deps)
  return [onShowModal, onCloseModal]
}
export function cloneModalContent(children) {
  return React.cloneElement(children, {
    onClick: (e) => {
      e.stopPropagation()
      const onChildClick = children.props.onClick
      if (onChildClick) {
        onChildClick()
      }
    },
  })
}
export const ModalLayer = (props) => {
  const { children } = props
  const { pathname } = useLocation()
  const [modalsMap, setModalsMap] = React.useState({})
  const [hiddenModals, setHiddenModals] = React.useState([])
  React.useEffect(() => {
    setModalsMap({})
  }, [pathname])
  const showModal = (modal, id) => {
    const uuid = id || uuidv4()
    setModalsMap((modals) =>
      Object.assign(Object.assign({}, modals), { [uuid]: modal }),
    )
    return uuid
  }
  const removeModal = (uuid) => {
    setModalsMap((modals) => {
      if (modals[uuid]) {
        delete modals[uuid]
        return Object.assign({}, modals)
      }
      return modals
    })
  }
  const closeModal = (uuid) => {
    setHiddenModals((x) => [...x, uuid])
  }
  const updateModal = (uuid, modal) => {
    setModalsMap((modals) => {
      if (modals[uuid]) {
        return Object.assign(Object.assign({}, modals), { [uuid]: modal })
      }
      return modals
    })
  }
  const onCloseBySelf = (key, modal) => () => {
    TOGGLED_MODALES[key] = modal
    closeModal(key)
  }
  const modalContext = { showModal, closeModal, removeModal, updateModal }
  return React.createElement(
    ModalContext.Provider,
    { value: modalContext },
    children,
    Object.keys(modalsMap).map((key, i) => {
      return React.createElement(modalsMap[key], {
        key,
        isOpen: !hiddenModals.includes(key),
        onClose: onCloseBySelf(key, modalsMap[key]),
        onRemove: () => removeModal(key),
      })
    }),
  )
}
