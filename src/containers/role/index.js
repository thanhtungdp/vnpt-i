import React from 'react'
import {Switch, Route } from 'react-router-dom'
import slug from 'constants/slug'
import RoleList from 'containers/role/role-list'

export default props => (
  <Switch>
    <Route path={slug.role.list} component={RoleList}/>
  </Switch>
)