import React from 'react'
import { Route } from 'react-router-dom'
import { autobind } from 'core-decorators'
import OverviewDashboard from 'containers/dashboard/OverviewDashboard'
import PageSidebarLayout from 'layout/default-sidebar-layout'

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
