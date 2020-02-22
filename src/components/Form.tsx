import * as React from 'react'
import { useInitFormContext } from '../logics/FormContext'

const FormContext = React.createContext<any>({})

export const TEST_NOT_NULL = /^$/
export const TEST_NOT_NUMBER = /^[0-9]+$/

export function useFormContext() {
  return React.useContext(FormContext)
}

export const enhanceFormComponent = (WrappedComponent: any) => (props: any) => {
  const { onSubmit = () => {} } = props
  const formContext = useInitFormContext()
  const { data, checks } = formContext

  React.useEffect(() => {
    let approved = true
    for (const name of Object.keys(checks)) {
      const checked = checks[name] === -1
      if (!checked) {
        approved = false
      }
    }
    if (!approved) {
      return
    }
    onSubmit(data)
  }, [checks])
  return (
    <FormContext.Provider value={formContext}>
      <WrappedComponent {...props} />
    </FormContext.Provider>
  )
}

export const enhanceFormInput = (WrappedComponent: any) => (props: any) => {
  const { name, test } = props
  const { initial, updateTest } = useFormContext()
  React.useEffect(() => {
    initial(name)
    if (test) {
      updateTest({ [name]: test })
    }
  }, [])
  return <WrappedComponent {...props} />
}

export function useFormState() {
  const { formData, setFormData } = React.useContext(FormContext)
  return [formData, setFormData]
}
