import * as React from 'react'
import { BrowserRouter } from 'react-router-dom'
import { ModalLayer } from './ModalLayer'
import { Toast } from '../components/Toast'

type IAppContainerProps = {
  basename?: string
  loading?: any
}

export const AppContext = React.createContext<any>(null)

export function useToastError(error: any) {
  const toggleToast = useToggleToast()
  React.useEffect(() => {
    if (error) {
      const text = error && (error.info || error.message)
      toggleToast(text)
    }
  }, [error])
}

export function useToggleToast(props: any = {}) {
  const { toggleToast } = React.useContext(AppContext)
  return React.useCallback(
    (text: string) => {
      toggleToast({ props, text })
    },
    [props],
  )
}

// WORKAROUND: webpack 打包时，如果依赖 context 是否为 null 进行 render,
// 则第二次 webpack 打包之后，存在先 render 的问题
export function useLoadingContext(defaultContext: any) {
  const [context, setContext] = React.useState(null)

  React.useEffect(() => {
    setContext((mContext) => mContext || defaultContext)
  }, [defaultContext])
  return [context, !context]
}

export const Container: React.FC<IAppContainerProps> = (props) => {
  const { children, basename } = props
  const [toasts, setToasts] = React.useState<any[]>([])
  const [appContext, loading] = useLoadingContext({
    toggleToast: (text: string) =>
      setToasts((mToasts: any) => [...mToasts, text]),
    removeToast: () => setToasts((mToasts) => mToasts.slice(1)),
  })
  return (
    <AppContext.Provider value={appContext}>
      {!loading && (
        <BrowserRouter basename={basename}>
          {toasts.map((toast, i) => (
            <Toast {...toast.props} key={i}>
              {toast.text}
            </Toast>
          ))}
          <ModalLayer>{children}</ModalLayer>
        </BrowserRouter>
      )}
    </AppContext.Provider>
  )
}
