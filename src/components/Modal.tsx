import * as React from 'react'
import styles from './styles/Modal.module.scss'
import {
  enhancePopupComponent,
  usePopupShown,
  IPopupProps,
  usePopupLayerOverlay,
} from '../components/Popup'

import { transformStyles } from '../utils/styles'
import { cloneModalContent } from '../containers/ModalLayer'

const cx = transformStyles(styles)

type IDrawerModalProps = IPopupProps & {
  children: React.ReactElement
  blankClose?: boolean
  className?: string
  noBg?: boolean
  noAnim?: boolean
}

const TModal: React.FC<IDrawerModalProps> = (props) => {
  const {
    isOpen,
    onClose,
    onRemove,
    blankClose,
    children,
    className,
    noBg,
    noAnim,
  } = props
  const shown = usePopupShown(isOpen)
  const onRemoveModal = usePopupLayerOverlay(shown, onRemove)

  return (
    <div
      className={cx('modal', className, {
        shown,
        'no-bg': noBg,
        'no-anim': noAnim,
      })}
      onClick={blankClose ? onClose : undefined}
      onTransitionEnd={onRemoveModal}
    >
      {cloneModalContent(children)}
    </div>
  )
}

export const Modal = enhancePopupComponent(TModal)
