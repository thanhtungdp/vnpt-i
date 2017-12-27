import React from 'react'
import { Route } from 'react-router-dom'
import { autobind } from 'core-decorators'

import LoginContainer from 'containers/auth/Login'

@autobind
export default class LoginRoute extends React.Component {
  render() {
    return (
      <div>
        <Route extract path="/" component={LoginContainer} />
      </div>
    )
  }
}
