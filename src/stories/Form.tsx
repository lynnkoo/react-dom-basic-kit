import React from 'react'
import {
  useFormContext,
  enhanceFormComponent,
  enhanceFormInput,
  TEST_NOT_NULL,
  TEST_NOT_NUMBER,
} from '../components/Form'
import { Input } from '../components/Input'

const TFormInput: React.FC<any> = (props: any) => {
  const { name, tips } = props
  const { update, checks, clearTips, check, errors } = useFormContext()
  const error = tips[checks[name]] || errors[name]
  return (
    <div>
      <Input
        onChange={(x) => update({ [name]: x.value })}
        onFocus={() => clearTips(name)}
        onBlur={() => check(name)}
      />
      {error}
    </div>
  )
}

const FormInput = enhanceFormInput(TFormInput)

const TForm: React.FC<any> = (props) => {
  const { children, pending, errors } = props
  const { data, submit, updateError } = useFormContext()
  React.useEffect(() => {
    updateError(errors)
  }, [errors])
  return (
    <form>
      <div>In Form1: {JSON.stringify(data)}</div>
      {children}
      <div onClick={submit}>SUBMIT{pending && '...'}</div>
    </form>
  )
}

export const Form1 = enhanceFormComponent(TForm)

export const FormTest = (props: any) => {
  const [pending, setPending] = React.useState(false)
  const [messages, setMessages] = React.useState({})
  const onSubmit = (data: any) => {
    console.log('submit:', data)
  }
  const onSubmitAsync = (data: any) => {
    console.log('submit pending:', data)
    setPending(true)
    setTimeout(() => {
      setMessages({
        xxx1: 'xxxx test error',
      })
      setPending(false)
    }, 1000)
  }
  return (
    <div>
      <Form1 onSubmit={onSubmit}>
        <div>Test Form</div>
        <FormInput
          name="x1"
          test={[TEST_NOT_NULL, TEST_NOT_NUMBER]}
          tips={['not null', 'not number']}
        />
        <FormInput name="x2" test={[TEST_NOT_NUMBER]} tips={['not number']} />
      </Form1>
      <Form1 onSubmit={onSubmitAsync} pending={pending} errors={messages}>
        <div>Test Form 2</div>
        <FormInput
          name="xxx1"
          test={[TEST_NOT_NULL, TEST_NOT_NUMBER]}
          tips={['not null', 'not number']}
        />
        <FormInput name="x2" test={[TEST_NOT_NUMBER]} tips={['not number']} />
      </Form1>
    </div>
  )
}
export default FormTest
