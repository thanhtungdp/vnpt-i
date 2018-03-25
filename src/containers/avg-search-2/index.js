import React from 'react'
import { Switch, Route } from 'react-router-dom'
import slug from 'constants/slug'
import MinutesDataSearch from './avg-data-form'
// Khởi tạo danh sách route dành cho measuring

export default props => (
  <Switch>
    {/*Lấy ra các thành phần props từ component bên ngoài truyền vào như default layout*/}
    <Route
      exact
      path={slug.avgSearch.base}
      render={matchProps => <MinutesDataSearch {...matchProps} {...props} />}
    />
  </Switch>
)
