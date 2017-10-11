import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import thunkMiddleware from 'redux-thunk'
import { middleware as awaitMiddleware } from 'redux-await'
import rootReducers from './reducers'

export default function create (
  initialState = {},
  { reducers = {}, middlewares = [] } = {}
) {
  var devTool = f => f
  if (typeof window !== 'undefined') {
    devTool = window.devToolsExtension ? window.devToolsExtension() : f => f
  }
  return createStore(
    combineReducers({
      ...rootReducers,
      ...reducers
    }),
    initialState,
    compose(
      applyMiddleware(thunkMiddleware, ...middlewares, awaitMiddleware),
      devTool
    )
  )
}
