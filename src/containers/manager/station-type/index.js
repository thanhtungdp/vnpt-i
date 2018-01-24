import React from 'react'
import { Switch, Route } from 'react-router-dom'
import slug from 'constants/slug'
import StationTypeList from './station-type-list'
import StationTypeCreate from './station-type-create'
import StationTypeEdit from './station-type-edit'
// Khởi tạo danh sách route dành cho measuring

export default props => (
  <Switch>
    {/*Lấy ra các thành phần props từ component bên ngoài truyền vào như default layout*/}
    <Route
      exact
      path={slug.stationType.list}
      render={matchProps => <StationTypeList {...matchProps} {...props} />}
    />
    <Route
      path={slug.stationType.create}
      render={matchProps => <StationTypeCreate {...matchProps} {...props} />}
    />
    <Route path={slug.stationType.edit} component={StationTypeEdit} />
    {/*<Route path={slug.measuring.create} component={MeasuringCreate} />*/}
  </Switch>
)
