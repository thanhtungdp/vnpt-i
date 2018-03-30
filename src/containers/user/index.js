import React from 'react'
import { Switch, Route } from 'react-router-dom'
import slug from 'constants/slug'
import UserList from './user-list'
import UserCreate from './user-create'
import UserEdit from './user-edit'
import UserRule from './user-rule'

export default props => (
  <Switch>
    <Route
      exact
      path={slug.user.list}
      render={matchProps => <UserList {...matchProps} {...props} />}
    />
    <Route
      path={slug.user.create}
      render={matchProps => <UserCreate {...matchProps} {...props} />}
    />
    <Route path={slug.user.edit} component={UserEdit} />
    <Route path={slug.user.rule} component={UserRule} />
  </Switch>
)
