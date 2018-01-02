import React from 'react'
import { Route } from 'react-router-dom'
import { autobind } from 'core-decorators'
import slug from 'constants/slug'
import OverviewDashboard from 'containers/dashboard/OverviewDashboard'
import PageSidebarLayout from 'layout/default-sidebar-layout'
import LandfillList from 'containers/landfill/landfill-list'
import LandfillCreate from 'containers/landfill/landfill-create'
import TransitStationList from 'containers/transit-station/transit-station-list'
import TransitStationCreate from 'containers/transit-station/transit-station-create'
import TransitStationEdit from 'containers/transit-station/transit-station-edit'
import OrganizationList from 'containers/organization/organization-list'
import OrganizationCreate from 'containers/organization/organization-create'
import OrganizationEdit from 'containers/organization/organization-edit'
import CarList from 'containers/car/car-list'
import CarCreate from 'containers/car/car-create'
import CarEdit from 'containers/car/car-edit'
import CategoriesList from 'containers/category/category-list'
import CategoriesCreate from 'containers/category/category-create'
import CategoriesEdit from 'containers/category/category-edit'

@autobind
export default class ManagerRoute extends React.Component {
  render() {
    return (
      <PageSidebarLayout>
        <Route exact path="/" component={OverviewDashboard} />
        <Route exact path={slug.landFill.list} component={LandfillList} />
        <Route exact path={slug.landFill.create} component={LandfillCreate} />
        <Route
          exact
          path={slug.transitStation.list}
          component={TransitStationList}
        />
        <Route
          exact
          path={slug.transitStation.create}
          component={TransitStationCreate}
        />
        <Route
          exact
          path={slug.transitStation.edit}
          component={TransitStationEdit}
        />
        <Route
          exact
          path={slug.organization.list}
          component={OrganizationList}
        />
        <Route
          exact
          path={slug.organization.create}
          component={OrganizationCreate}
        />
        <Route
          exact
          path={slug.organization.edit}
          component={OrganizationEdit}
        />
        <Route exact path={slug.car.list} component={CarList} />
        <Route exact path={slug.car.create} component={CarCreate} />
        <Route exact path={slug.car.edit} component={CarEdit} />
        {/* <Route exact path={slug.map.base} component={MapDefault} /> */}
        <Route exact path={slug.category.list} component={CategoriesList} />
        <Route exact path={slug.category.create} component={CategoriesCreate} />
        <Route exact path={slug.category.edit} component={CategoriesEdit} />
      </PageSidebarLayout>
    )
  }
}
