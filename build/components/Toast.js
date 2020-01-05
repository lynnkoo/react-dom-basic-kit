import * as React from 'react'
import * as ReactDOM from 'react-dom'
import styles from './styles/Toast.module.scss'
import { transformStyles } from '../utils/styles'
import { AppContext } from '../containers/Container'
const cx = transformStyles(styles)
const TOAST_LAYER_ID = 'ToastLayer'
const createToastLayer = () => {
  const node = document.createElement('div')
  node.id = TOAST_LAYER_ID
  node.className = cx('toast-layer')
  document.body.appendChild(node)
  return node
}
const removeToastLayer = (rootNode) => {
  if (rootNode.children.length === 0) {
    if (!document.body.contains(rootNode)) {
      return
    }
    document.body.className = ''
    document.body.removeChild(rootNode)
  }
}
const ToastComponent = (props) => {
  const rootNode = document.getElementById(TOAST_LAYER_ID) || createToastLayer()
  React.useEffect(() => {
    return () => {
      // WORKAROUND 延迟 10 毫秒关闭弹出层确保组件已经关闭并且没有新的弹窗出现
      setTimeout(() => {
        removeToastLayer(rootNode)
      }, 10)
    }
  })
  return ReactDOM.createPortal(React.cloneElement(props.children), rootNode)
}
export const Toast = (props) => {
  const { children } = props
  const [visible, setVisible] = React.useState(true)
  const { removeToast } = React.useContext(AppContext)
  React.useEffect(() => {
    setTimeout(() => {
      setVisible(false)
    }, 1500)
  })
  return visible
    ? React.createElement(
        ToastComponent,
        null,
        React.createElement('div', { className: cx('toast') }, children),
      )
    : null
}
