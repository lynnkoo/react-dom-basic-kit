import * as React from 'react'
import styles from './styles/Modal.module.scss'
import {
  enhancePopupComponent,
  usePopupShown,
  usePopupLayerOverlay,
} from '../components/Popup'
import { transformStyles } from '../utils/styles'
import { cloneModalContent } from '../containers/ModalLayer'
const cx = transformStyles(styles)
const TModal = (props) => {
  const { isOpen, onClose, onRemove, blankClose, children, className } = props
  const shown = usePopupShown(isOpen)
  const onRemoveModal = usePopupLayerOverlay(shown, onRemove)
  return React.createElement(
    'div',
    {
      className: cx('modal', className, { shown }),
      onClick: blankClose ? onClose : undefined,
      onTransitionEnd: onRemoveModal,
    },
    cloneModalContent(children),
  )
}
export const Modal = enhancePopupComponent(TModal)
