import React from 'react'
import ReactDOM from 'react-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'simple-line-icons/css/simple-line-icons.css'
import 'font-awesome/css/font-awesome.css'
import 'sweetalert2/dist/sweetalert2.css'
import 'animate.css/animate.css'
import 'react-datepicker/dist/react-datepicker.css'
import 'antd/dist/antd.css'
import './index.css'

import { AppContainer } from 'react-hot-loader'
import browserHistory from 'history/createBrowserHistory'
import configureStore from './redux/createStore'
import App from './App'
import registerServiceWorker from './registerServiceWorker'

const rootEl = document.getElementById('root')

const getStoreDefault = () => {
  if (typeof window !== 'undefined')
    return window.__REDUX_STORE__ ? window.__REDUX_STORE__ : {}
  return {}
}

const store = configureStore(getStoreDefault(), {
  routerHistory: browserHistory()
})

const render = Component => {
  ReactDOM.render(
    <AppContainer>
      <App store={store} />
    </AppContainer>,
    rootEl
  )
}

render(App)

// Webpack Hot Module Replacement API
if (module.hot) {
  module.hot.accept('./App', () => {
    render(App)
  })
}
registerServiceWorker()
