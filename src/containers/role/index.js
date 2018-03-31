import React from 'react'
import { Switch, Route } from 'react-router-dom'
import slug from 'constants/slug'
import RoleList from 'containers/role/role-list'
import RoleCreate from 'containers/role/role-create'
import RoleEdit from 'containers/role/role-edit'

export default props => (
  <Switch>
    <Route
      exact
      path={slug.role.list}
      render={matchProps => <RoleList {...matchProps} {...props} />}
    />
    <Route
      path={slug.role.create}
      render={matchProps => <RoleCreate {...matchProps} {...props} />}
    />
    <Route
      path={slug.role.edit}
      render={matchProps => <RoleEdit {...matchProps} {...props} />}
    />
  </Switch>
)
