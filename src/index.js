/**
 * Imports
 */

import createStore from '@f/store'
import driver, {BOOT} from '@koax/driver'
/**
 * store
 */

function store (reducer, initialState, listener) {
  let {dispatch, subscribe, getState, replaceReducer} = createStore(reducer, initialState)

  let {drive} = driver(push => subscribe(state => {
    console.log('state change push')
    push(state)
  }))

  return function * (action, next, ctx) {
    if (action.type === BOOT) {
      console.log('**boot')
      ctx.getState = getState
      console.log('boot')
      ctx.replaceReducer = replaceReducer
      console.log('boot')
      yield drive(listener)
      return next()
    }
    return dispatch(action)
  }
}


/**
 * Exports
 */

export default store
