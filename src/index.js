/**
 * Imports
 */

import createStore from '@f/store'

/**
 * store
 */

function store (reducer, initialState, koax) {
  let {dispatch, subscribe, getState, replaceReducer} = createStore(reducer, initialState)
  koax.use(function (action, next) {
    return dispatch(action)
  })
  koax.bind(getState)
  return {subscribe, getState, replaceReducer}
}


/**
 * Exports
 */

export default store
