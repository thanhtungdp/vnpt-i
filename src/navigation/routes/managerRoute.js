import React from 'react'
import { Route } from 'react-router-dom'
import { autobind } from 'core-decorators'
import slug from 'constants/slug'
import OverviewDashboard from 'containers/dashboard/OverviewDashboard'
import PageSidebarLayout from 'layout/default-sidebar-layout'
import LandfillList from 'containers/station/landfill/landfill-list'
import LandfillCreate from 'containers/station/landfill/landfill-create'
import LandfillEdit from 'containers/station/landfill/landfill-edit'
import TransitStationList from 'containers/station/transit-station/transit-station-list'
import TransitStationCreate from 'containers/station/transit-station/transit-station-create'
import TransitStationEdit from 'containers/station/transit-station/transit-station-edit'
import OrganizationList from 'containers/general/organization/organization-list'
import OrganizationCreate from 'containers/general/organization/organization-create'
import OrganizationEdit from 'containers/general/organization/organization-edit'
import CarList from 'containers/general/car/car-list'
import CarCreate from 'containers/general/car/car-create'
import CarEdit from 'containers/general/car/car-edit'
import CategoriesList from 'containers/general/category/category-list'
import CategoriesCreate from 'containers/general/category/category-create'
import CategoriesEdit from 'containers/general/category/category-edit'
import AppointmentStationList from 'containers/station/appointment-station/appointment-station-list'
import AppointmentStationCreate from 'containers/station/appointment-station/appointment-station-create'
import AppointmentStationEdit from 'containers/station/appointment-station/appointment-station-edit'

@autobind
export default class ManagerRoute extends React.Component {
  render() {
    return (
      <PageSidebarLayout>
        <Route exact path="/" component={OverviewDashboard} />
        <Route exact path={slug.landFill.list} component={LandfillList} />
        <Route exact path={slug.landFill.create} component={LandfillCreate} />
        <Route exact path={slug.landFill.edit} component={LandfillEdit} />
        <Route
          exact
          path={slug.stationTransit.list}
          component={TransitStationList}
        />
        <Route
          exact
          path={slug.stationTransit.create}
          component={TransitStationCreate}
        />
        <Route
          exact
          path={slug.stationTransit.edit}
          component={TransitStationEdit}
        />
        <Route
          exact
          path={slug.staionAppointment.list}
          component={AppointmentStationList}
        />
        <Route
          exact
          path={slug.staionAppointment.create}
          component={AppointmentStationCreate}
        />
        <Route
          exact
          path={slug.staionAppointment.edit}
          component={AppointmentStationEdit}
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
