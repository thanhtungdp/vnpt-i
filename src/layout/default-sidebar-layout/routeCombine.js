import { Route } from 'react-router-dom'
import React from 'react'
import DefaultLayout from './index'

// Tạo ra route dành cho layout, để các component sử dụng chung
export default ({ component: ChildComponent, ...otherProps }) => (
	<Route
		{...otherProps}
		render={matchProps => (
			<DefaultLayout>
				<ChildComponent {...matchProps} />
			</DefaultLayout>
		)}
	/>
)
