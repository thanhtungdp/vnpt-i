import React from 'react'
import ReactDOM from 'react-dom'
import 'bootstrap/dist/css/bootstrap.css'
import 'simple-line-icons/css/simple-line-icons.css'
import 'font-awesome/css/font-awesome.css'
import 'sweetalert2/dist/sweetalert2.css'
import App from './App'
import registerServiceWorker from './registerServiceWorker'

ReactDOM.render(<App />, document.getElementById('root'))
registerServiceWorker()
