import React from 'react'
import { Switch, Route } from 'react-router-dom'
import LoginContainer from '../containers/auth/Login'
import { autobind } from 'core-deocrators'
import OverviewDashboard from '../containers/dashboard/OverviewDashboard'
import PageSidebarLayout from '../layout/default-sidebar-layout'

@autobind
export default class RouteDefautl extends React.Component {
  render() {
    return (
      <PageSidebarLayout>
        <Route exact path="/" component={OverviewDashboard} />
      </PageSidebarLayout>
    )
  }
}
