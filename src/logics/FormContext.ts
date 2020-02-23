import * as React from 'react'
import { createReducer } from '../utils/react'

const FORM_INITIAL_STATE = 'FORM_INITIAL_STATE'
const FORM_UPDATE_DATA = 'FORM_UPDATE_DATA'
const FORM_SUBMIT_DATA = 'FORM_SUBMIT_DATA'
const FORM_UPDATE_TEST = 'FORM_UPDATE_TEST'
const FORM_CHECK_DATA = 'FORM_CHECK_DATA'
// const FORM_CHECK_ALL_DATA = 'FORM_CHECK_ALL_DATA'
const FORM_CLEAR_TIPS = 'FORM_CLEAR_TIPS'
const FORM_UPDATE_ERROR = 'FORM_UPDATE_ERROR'
const FORM_CLEAR_ERROR = 'FORM_CLEAR_ERROR'

const initial = (name: string) => ({ type: FORM_INITIAL_STATE, name })
const update = (data: any) => ({ type: FORM_UPDATE_DATA, data })
const updateTest = (test: any) => ({ type: FORM_UPDATE_TEST, test })
const check = (name: string) => ({ type: FORM_CHECK_DATA, name })
// const checkAll = () => ({ type: FORM_CHECK_ALL_DATA })
const submit = () => ({ type: FORM_SUBMIT_DATA })
const clearTips = (name: string) => ({ type: FORM_CLEAR_TIPS, name })
const updateError = (error: any) => ({ type: FORM_UPDATE_ERROR, error })
const clearError = (name: any) => ({ type: FORM_CLEAR_ERROR, name })

const initialState = {
  data: {},
  checks: {},
  tests: {},
  errors: {},
  doSubmit: false,
}

function asFormDataCheck(value: string = '', test: any[]) {
  if (!test) {
    return -1
  }
  for (let i = 0; i < test.length; i++) {
    const exp = test[i]
    if (value.match(exp)) {
      return i
    }
  }
  return -1
}

function asFormChecks(data: any, tests: any): boolean {
  const checks: any = {}
  for (const name of Object.keys(data)) {
    const test = tests[name]
    const value = data[name] || ''
    checks[name] = asFormDataCheck(value, test)
  }
  return checks
}

const reducerMap = (state: any) => ({
  [FORM_INITIAL_STATE]: ({ name }: any) => {
    state.data[name] = ''
    state.checks[name] = -1
  },
  [FORM_SUBMIT_DATA]: () => {
    state.checks = asFormChecks(state.data, state.tests)
    // tslint:disable-next-line
    state.doSubmit = new Boolean(true) // 为了更新 doSubmit 的动作，取值时注意使用 valueOf
  },
  [FORM_CHECK_DATA]: ({ name }: any) => {
    state.checks[name] = asFormDataCheck(state.data[name], state.tests[name])
  },
  [FORM_CLEAR_TIPS]: ({ name }: any) => {
    state.checks[name] = -1
    state.errors[name] = ''
  },
  [FORM_CLEAR_ERROR]: ({ name }: any) => {
    state.errors[name] = ''
  },
  [FORM_UPDATE_DATA]: ({ data }: any) => ({
    ...state,
    data: { ...state.data, ...data },
  }),
  [FORM_UPDATE_TEST]: ({ test }: any) => ({
    ...state,
    tests: { ...state.tests, ...test },
  }),
  [FORM_UPDATE_ERROR]: ({ error }: any) => ({
    ...state,
    errors: { ...state.errors, ...error },
  }),
})

const appReducer = createReducer(reducerMap)

export function useInitFormContext() {
  const [state, dispatch] = React.useReducer(appReducer, initialState)
  return {
    data: state.data,
    checks: state.checks,
    errors: state.errors,
    doSubmit: state.doSubmit,
    initial: (name: any) => dispatch(initial(name)),
    update: (data: any) => dispatch(update(data)),
    updateTest: (test: any) => dispatch(updateTest(test)),
    updateError: (error: any) => dispatch(updateError(error)),
    check: (name: string) => dispatch(check(name)),
    // checkAll: () => dispatch(checkAll()),
    submit: () => dispatch(submit()),
    clearTips: (name: any) => dispatch(clearTips(name)),
    clearError: (name: any) => dispatch(clearError(name)),
  }
}
