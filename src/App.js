import React, { Component } from 'react'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import AppRoutes from 'navigation/routes'
import AppContainer from 'redux/AppContainer'

export default class App extends Component {
  render() {
    return (
      <Provider store={this.props.store}>
        <AppContainer>
          <BrowserRouter>
            <AppRoutes />
          </BrowserRouter>
        </AppContainer>
      </Provider>
    )
  }
}
