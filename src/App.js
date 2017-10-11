import React, { Component } from 'react'
import { Provider } from 'react-redux'
import { browserHistory, Router } from 'react-router'

import configureStore from './redux/createStore'
import AppRoutes from './routes'

const getStoreDefault = () => {
  if (typeof window !== 'undefined')
    return window.__REDUX_STORE__ ? window.__REDUX_STORE__ : {}
  return {}
}

const store = configureStore(getStoreDefault(), {
  routerHistory: browserHistory
})

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router history={browserHistory}>
          {AppRoutes()}
        </Router>
      </Provider>
    )
  }
}
