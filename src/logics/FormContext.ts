import * as React from 'react'

const FORM_INITIAL_STATE = 'FORM_INITIAL_STATE'
const FORM_UPDATE_DATA = 'FORM_UPDATE_DATA'
const FORM_SUBMIT_DATA = 'FORM_SUBMIT_DATA'
const FORM_UPDATE_TEST = 'FORM_UPDATE_TEST'
const FORM_CHECK_DATA = 'FORM_CHECK_DATA'
const FORM_CHECK_ALL_DATA = 'FORM_CHECK_ALL_DATA'
const FORM_CLEAR_CHECK = 'FORM_CLEAR_CHECK'

const initial = (name: string) => ({ type: FORM_INITIAL_STATE, name })
const update = (data: any) => ({ type: FORM_UPDATE_DATA, data })
const updateTest = (test: any) => ({ type: FORM_UPDATE_TEST, test })
const check = (name: string) => ({ type: FORM_CHECK_DATA, name })
const checkAll = () => ({ type: FORM_CHECK_ALL_DATA })
const submit = () => ({ type: FORM_SUBMIT_DATA })
const clearCheck = (name: string) => ({ type: FORM_CLEAR_CHECK, name })

const initialState = {
  data: {},
  checks: {},
  tests: {},
  submit: false, // TODO: 不确定需不需要 check all 函数
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

const appReducer = (state: any, action: any) => {
  console.log(action)
  switch (action.type) {
    case FORM_INITIAL_STATE:
      return {
        ...state,
        data: { ...state.data, [action.name]: '' },
        checks: { ...state.checks, [action.name]: -1 },
      }
    case FORM_UPDATE_DATA:
      return {
        ...state,
        data: { ...state.data, ...action.data },
      }
    case FORM_UPDATE_TEST:
      return {
        ...state,
        tests: { ...state.tests, ...action.test },
      }
    case FORM_CHECK_ALL_DATA:
    case FORM_SUBMIT_DATA:
      return {
        ...state,
        checks: asFormChecks(state.data, state.tests),
        submit: action.type === FORM_SUBMIT_DATA,
      }
    case FORM_CHECK_DATA:
      return {
        ...state,
        checks: {
          ...state.checks,
          [action.name]: asFormDataCheck(
            state.data[action.name],
            state.tests[action.name],
          ),
        },
      }
    case FORM_CLEAR_CHECK:
      return {
        ...state,
        checks: { ...state.checks, [action.name]: -1 },
      }
  }
  return state
}

export function useInitFormContext() {
  const [state, dispatch] = React.useReducer(appReducer, initialState)
  return {
    data: state.data,
    checks: state.checks,
    initial: (name: any) => dispatch(initial(name)),
    update: (data: any) => dispatch(update(data)),
    updateTest: (test: any) => dispatch(updateTest(test)),
    check: (name: string) => dispatch(check(name)),
    // checkAll: () => dispatch(checkAll()),
    submit: () => dispatch(submit()),
    clearCheck: (name: any) => dispatch(clearCheck(name)),
  }
}
