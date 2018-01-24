import React from 'react'
import { Switch, Route } from 'react-router-dom'
import slug from 'constants/slug'
import MeasuringList from './measuring-list'
import MeasuringCreate from './measuring-create'
import MeasuringEdit from './measuring-edit'
// Khởi tạo danh sách route dành cho measuring

export default props => (
  <Switch>
    {/*Lấy ra các thành phần props từ component bên ngoài truyền vào như default layout*/}
    <Route
      exact
      path={slug.measuring.list}
      render={matchProps => <MeasuringList {...matchProps} {...props} />}
    />
    <Route
      path={slug.measuring.create}
      render={matchProps => <MeasuringCreate {...matchProps} {...props} />}
    />
    <Route path={slug.measuring.edit} component={MeasuringEdit} />
    {/*<Route path={slug.measuring.create} component={MeasuringCreate} />*/}
  </Switch>
)
