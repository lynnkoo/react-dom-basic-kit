import produce from 'immer'

export function createReducer(reducerMap: any) {
  return produce((state: any, action: any) => {
    console.log(action)
    const reducer = reducerMap(state)[action.type]
    if (reducer) {
      return reducer(action)
    }
    return state
  })
}
