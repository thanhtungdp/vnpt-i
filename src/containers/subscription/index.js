import React from 'react'
import { Switch, Route } from 'react-router-dom'
import slug from 'constants/slug'
import SubscriptionOverview from './subscription-overview'

export default props => (
  <Switch>
    <Route
      exact
      path={slug.subscription.base}
      render={matchProps => <SubscriptionOverview {...matchProps} {...props} />}
    />
  </Switch>
)
