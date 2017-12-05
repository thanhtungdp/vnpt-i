import React, { Component } from 'react'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import browserHistory from 'history/createBrowserHistory'

import configureStore from './redux/createStore'
import AppRoutes from './navigation/routes'

const getStoreDefault = () => {
  if (typeof window !== 'undefined')
    return window.__REDUX_STORE__ ? window.__REDUX_STORE__ : {}
  return {}
}

const store = configureStore(getStoreDefault(), {
  routerHistory: browserHistory()
})

export default class App extends Component {
  render() {
    return (
      <Provider store={this.props.store}>
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </Provider>
    )
  }
}
