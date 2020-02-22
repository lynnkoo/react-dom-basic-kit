import React from 'react'
import {
  useFormContext,
  enhanceFormComponent,
  enhanceFormInput,
  TEST_NOT_NULL,
  TEST_NOT_NUMBER,
} from '../components/Form'

const TFormInput: React.FC<any> = (props: any) => {
  const { name, tips } = props
  const { update, checks, clearCheck, check } = useFormContext()
  const error = checks[name]
  return (
    <div>
      <input
        onChange={(x) => update({ [name]: x.target.value })}
        onFocus={() => clearCheck(name)}
        onBlur={() => check(name)}
      />
      {error > -1 && tips[error]}
    </div>
  )
}

const FormInput = enhanceFormInput(TFormInput)

const TForm: React.FC<any> = (props) => {
  const { children } = props
  const { data, submit } = useFormContext()
  return (
    <form>
      <div>In Form1: {JSON.stringify(data)}</div>
      {children}
      <div onClick={submit}>SUBMIT</div>
    </form>
  )
}

export const Form1 = enhanceFormComponent(TForm)

export const FormTest = (props: any) => {
  const onSubmit = (data: any) => {
    console.log('submit:', data)
  }
  return (
    <Form1 onSubmit={onSubmit}>
      <div>Test Form</div>
      <FormInput
        name="x1"
        test={[TEST_NOT_NULL, TEST_NOT_NUMBER]}
        tips={['not null', 'not number']}
      />
      <FormInput name="x2" test={[TEST_NOT_NUMBER]} tips={['not number']} />
    </Form1>
  )
}
export default FormTest
