import React from 'react'
import { Route } from 'react-router'
import LoginContainer from './containers/auth/Login'
import OverviewDashboard from './containers/dashboard/OverviewDashboard'

export default () => {
  return (
    <Route>
      <Route path="/dashboard" component={OverviewDashboard} />
      <Route path="/login" component={LoginContainer} />
    </Route>
  )
}
