import React from 'react'
import { Route } from 'react-router-dom'
import { autobind } from 'core-decorators'
import slug from 'constants/slug'
import OverviewDashboard from 'containers/dashboard/OverviewDashboard'
import PageSidebarLayout from 'layout/default-sidebar-layout'

import LandfillList from 'containers/landfill/landfill-list'
import LandfillCreate from 'containers/landfill/landfill-create'
import TransitStationList from 'containers/transitstation/transitstation-list'
import OrganizationList from 'containers/organization/organization-list'
import OrganizationCreate from 'containers/organization/organization-create'
import OrganizationEdit from 'containers/organization/organization-edit'

@autobind
export default class ManagerRoute extends React.Component {
  render() {
    return (
      <PageSidebarLayout>
        <Route exact path="/" component={OverviewDashboard} />
        <Route exact path={slug.landFill.list} component={LandfillList} />
        <Route exact path={slug.landFill.create} component={LandfillCreate} />
        <Route exact path={slug.transitStation.list} component={TransitStationList} />
        <Route exact path={slug.organization.list} component={OrganizationList} />
        <Route exact path={slug.organization.create} component={OrganizationCreate} />
        <Route exact path={slug.organization.edit} component={OrganizationEdit} />
      </PageSidebarLayout>
    )
  }
}
