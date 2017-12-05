import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import thunkMiddleware from 'redux-thunk'
import { middleware as awaitMiddleware } from 'redux-await'
import rootReducers from './reducers'

export default function create(
  initialState = {},
  { reducers = {}, middlewares = [] } = {}
) {
  var devTool = f => f
  if (typeof window !== 'undefined') {
    devTool = window.devToolsExtension ? window.devToolsExtension() : f => f
  }
  const store = createStore(
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
  if (process.env.NODE_ENV !== 'production') {
    if (module.hot) {
      module.hot.accept('./reducers', () => {
        store.replaceReducer(...rootReducers, ...reducers)
      })
    }
  }
  return store
}
