/**
 * Imports
 */

import createStore from '@f/store'

/**
 * store
 */

function store (reducer, initialState, app) {
  let {dispatch, subscribe, getState, replaceReducer} = createStore(reducer, initialState)
  app.use(function (action, next) {
    return dispatch(action)
  })
  app.bind(getState)
  return {subscribe, getState, replaceReducer}
}


/**
 * Exports
 */

export default store
