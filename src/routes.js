import React from 'react'
import { Route } from 'react-router'
import LoginContainer from './containers/auth/Login'

export default () => {
  return (
    <Route>
      <Route path="/login" component={LoginContainer} />
    </Route>
  )
}
