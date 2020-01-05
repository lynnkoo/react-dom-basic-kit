import * as React from 'react'
export const Form = () => {
  return null
}
const FormContext = React.createContext({})
export const enhanceFormComponent = (WrappedComponent) => (props) => {
  const [formContext, setFormContext] = React.useState()
  const [formData, setFormData] = React.useState({})
  React.useEffect(() => {
    setFormContext({
      formData,
      setFormData: (data) => {
        setFormData((x) => Object.assign(Object.assign({}, x), data))
      },
    })
  }, [formData])
  return React.createElement(
    FormContext.Provider,
    { value: formContext },
    formContext &&
      React.createElement(WrappedComponent, Object.assign({}, props)),
  )
}
export function useFormState() {
  const { formData, setFormData } = React.useContext(FormContext)
  // React.useEffect(() => {
  //   if (data) {
  //     setFormData(data)
  //   }
  // }, [])
  return [formData, setFormData]
}
