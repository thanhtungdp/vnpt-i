import React from 'react'
import { Switch, Route } from 'react-router-dom'
import slug from 'constants/slug'
import StationTypeCreate from './support-create'
// Khởi tạo danh sách route dành cho measuring

export default props => (
  <Switch>
    {/*Lấy ra các thành phần props từ component bên ngoài truyền vào như default layout*/}
    <Route
      path={slug.support.base}
      render={matchProps => <StationTypeCreate {...matchProps} {...props} />}
    />
    {/*<Route path={slug.measuring.create} component={MeasuringCreate} />*/}
  </Switch>
)
