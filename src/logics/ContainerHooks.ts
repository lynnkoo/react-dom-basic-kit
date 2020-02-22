import * as React from 'react'
import { AppContext } from '../containers/Container'
import { transformStyles } from '../utils/styles'

export function useAppContext() {
  return React.useContext(AppContext)
}

// TODO: legacy code
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
  const { toggleToast } = useAppContext()
  return React.useCallback(
    (text: string) => {
      toggleToast({ props, text })
    },
    [props],
  )
}

export function useThemeStyles(styles: any, themes?: any) {
  const { theme } = useAppContext()
  return transformStyles(styles, { themes, currentTheme: theme })
}
