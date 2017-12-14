import React, { Component } from 'react'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import AppRoutes from 'navigation/routes'

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
