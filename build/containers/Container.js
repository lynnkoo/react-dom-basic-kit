import * as React from 'react'
import { BrowserRouter } from 'react-router-dom'
import { ModalLayer } from './ModalLayer'
import { Toast } from '../components/Toast'
export const AppContext = React.createContext(null)
export function useToastError(error) {
  const toggleToast = useToggleToast(error && (error.info || error.message))
  React.useEffect(() => {
    if (error) {
      toggleToast()
    }
  }, [error])
}
export function useToggleToast(text) {
  const { toggleToast } = React.useContext(AppContext)
  return React.useCallback(
    (msg) => {
      toggleToast(typeof msg === 'string' ? msg : text)
    },
    [text],
  )
}
export const Container = (props) => {
  const { children, basename } = props
  const [toasts, setToasts] = React.useState([])
  const appContext = {
    toggleToast: (text) => setToasts((mToasts) => [...mToasts, text]),
    removeToast: () => setToasts((mToasts) => mToasts.slice(1)),
  }
  return React.createElement(
    AppContext.Provider,
    { value: appContext },
    React.createElement(
      BrowserRouter,
      { basename: basename },
      toasts.map((toast, i) => React.createElement(Toast, { key: i }, toast)),
      React.createElement(ModalLayer, null, children),
    ),
  )
}
