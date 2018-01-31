import React from 'react'
import { Switch, Route } from 'react-router-dom'
import slug from 'constants/slug'
import MinutesDataSearch from './minutes-data-search'
// Khởi tạo danh sách route dành cho measuring

export default props => (
  <Switch>
    {/*Lấy ra các thành phần props từ component bên ngoài truyền vào như default layout*/}
    <Route
      exact
      path={slug.dataSearch.minutesDataSearch}
      render={matchProps => <MinutesDataSearch {...matchProps} {...props} />}
    />
  </Switch>
)
