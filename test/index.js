/**
 * Imports
 */

import test from 'tape'
import createStore from '../src'
import koax from 'koax'
import identity from '@f/identity'

/**
 * Tests
 */

test('should dispatch actions to store', (t) => {
  let log = []
  let app = koax()
  app.use(function (action, next) {
    log.push(action)
    next()
  })
  let store = createStore(reducer, {}, app)

  app({type: 'woot'})
  t.deepEqual(store.getState(), {foo: 'bar'})
  t.end()

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
