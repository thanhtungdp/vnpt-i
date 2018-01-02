import React from 'react'
import ReactDOM from 'react-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'simple-line-icons/css/simple-line-icons.css'
import 'font-awesome/css/font-awesome.css'
import 'sweetalert2/dist/sweetalert2.css'
import 'animate.css/animate.css'
import 'react-datepicker/dist/react-datepicker.css'

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

ReactDOM.render(<App store={store} />, rootEl)
if (module.hot) {
  module.hot.accept('./App', () => {
    const NextApp = require('./App').default
    ReactDOM.render(<NextApp store={store} />, rootEl)
  })
}

registerServiceWorker()
