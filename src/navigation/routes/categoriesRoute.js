import React from 'react'
import { Route } from 'react-router-dom'
import { autobind } from 'core-decorators'
import slug from 'constants/slug'
import OverviewDashboard from 'containers/dashboard/OverviewDashboard'
import PageSidebarLayout from 'layout/default-sidebar-layout'

import CategoriesList from 'containers/categories/categories-list'
import CategoriesCreate from 'containers/categories/categories-create'
import CategoriesEdit from 'containers/categories/categories-edit'

@autobind
export default class CategoriesRouth extends React.Component {
  render() {
    return (
      <PageSidebarLayout>
        <Route exact path="/" component={OverviewDashboard} />
        <Route exact path={slug.categories.list} component={CategoriesList} />
        <Route exact path={slug.categories.create} component={CategoriesCreate} />
        <Route exact path={slug.categories.edit} component={CategoriesEdit} />
      </PageSidebarLayout>
    )
  }
}
