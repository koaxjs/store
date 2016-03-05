
# store

[![Build status][travis-image]][travis-url]
[![Git tag][git-image]][git-url]
[![NPM version][npm-image]][npm-url]
[![Code style][standard-image]][standard-url]

![stability-experimental](https://img.shields.io/badge/stability-experimental-orange.svg?style=flat-square)

Redux style store.

## Installation

    $ npm install @koax/store

## Usage

```js
import koax from 'koax'
import createStore from '@koax/store'
import combineReducers from '@f/combine-reducers'
import getProp from '@f/get-prop'
import {fetchEffect, fetchType} from '@koax/fetch'
import {get} from '@koax/fetch-json'

const REQUEST_POSTS = 'REQUEST_POSTS'
const RECEIVE_POSTS = 'RECEIVE_POSTS'
const RETRIEVE_STATE = 'RETRIEVE_STATE'

let app = koax()
app.use(fetchEffect)
app.use(retrieveState)
let store = createStore(combineReducers({postsBySubredit}), {}, app)

app(getPosts('frontend')).then(res => res) // => frontend posts

function * getPosts (subredit) {
  let items = yield {type: RETRIEVE_STATE, path: `postsBySubredit.${subredit}.items`}
  if (!items) {
    yield {type: REQUEST_POSTS, subredit}
    items = yield get(`api.redit.com/posts/${subredit}`)
    yield {
      type: RECEIVE_POSTS,
      payload: items
      subredit
    }
  }
  return items
}

function retrieveState (action, next getState) {
  if (action.type === RETRIEVE_STATE) {
    return getProp(action.path, getState())
  }
  return next()
}

function postsBySubredit (state, action) {
  switch (action.type) {
    case REQUEST_POSTS:
      return {
        ...state,
        [action.subredit]: {
          isFetching: true
        }
      }
    case RECEIVE_POSTS:
      return {
        ...state,
        [action.subredit]: {
          isFetching: false,
          items: action.payload
        }
      }
  }
}

```

## API

### store(reducer, initialState, app)

- `reducer` - redux style reducer
- `initialState` - initial state object
- `app` - koax app to bind state and mount store dispatcher

**Returns:** store (redux store api excluding dispatch - koax app should be used to dispatch)

## .getState()

**Returns:** current state of store

## .subscribe(listener)

- `listener` - listener called when updates to state occur - recieves new state

## .replaceReducer(reducer)

- `reducer` - new reducer to

## License

MIT

[travis-image]: https://img.shields.io/travis/koaxjs/store.svg?style=flat-square
[travis-url]: https://travis-ci.org/koaxjs/store
[git-image]: https://img.shields.io/github/tag/koaxjs/store.svg
[git-url]: https://github.com/koaxjs/store
[standard-image]: https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat
[standard-url]: https://github.com/feross/standard
[npm-image]: https://img.shields.io/npm/v/@koax/store.svg?style=flat-square
[npm-url]: https://npmjs.org/package/@koax/store
