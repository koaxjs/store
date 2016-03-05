/**
 * Imports
 */

import test from 'tape'
import createStore from '../src'
import koax, {run} from 'koax'
import identity from '@f/identity'

/**
 * Tests
 */

test.only('should dispatch actions to store', (t) => {
  let log = []
  let app = koax()
  app.use(function (action, next) {
    console.log('action', action)
     log.push(action)
    return next()
  })


  app.use(createStore(reducer, {}, state => {
    console.log('listener', state)
    return {type: 'CHANGE_STATE', payload: state}
  }))

  let ctx = {}
  let stateChanges = 0
  let dispatch = run(app, function * main (action) {
    console.log('action', action)
    if (action.type === 'CHANGE_STATE') {
      stateChanges++
    } else {
      return action
    }
  }, ctx)

  dispatch({type: 'woot'}).then(function (val) {
    t.deepEqual(ctx.getState(), {foo: 'bar'})
    t.deepEqual(stateChanges, 1)
    t.end()
  })


  function reducer (state, action) {
    return {foo: 'bar'}
  }
})

test('should bind getState as context', (t) => {
  let app = koax()
  let i = {}
  app.use(function (action, next, getState) {
    t.equal(getState(), i)
    t.end()
  })
  createStore(identity, i, app)
  app({type: 'woot'})
})
