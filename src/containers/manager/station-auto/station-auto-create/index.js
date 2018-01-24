import React from 'react'
import PageContainer from 'layout/default-sidebar-layout/PageContainer'
import { message } from 'antd'
import { autobind } from 'core-decorators'
import StationAutoApi from 'api/StationAuto'
import slug from 'constants/slug'
import StationAutoForm from '../station-auto-form'
import Breadcrumb from '../breadcrumb'

@autobind
export default class StationAutoCreate extends React.PureComponent {
	async handleSubmit(data) {
		const res = await StationAutoApi.createStationAuto(data)
		if (res.success) {
			message.info('Add measuring success!')
			this.props.history.push(slug.stationAuto.list)
		}
	}

	render() {
		return (
			<PageContainer {...this.props.wrapperProps}>
				<Breadcrumb items={['list','create']} />
				<StationAutoForm onSubmit={this.handleSubmit} />
			</PageContainer>
		)
	}
}
