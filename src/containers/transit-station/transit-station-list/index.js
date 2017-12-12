import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { autobind } from 'core-decorators';
import Button from '@atlaskit/button';

import ManagerApi from 'api/ManagerApi';
import DynamicTable from 'components/elements/dynamic-table';
import Clearfix from 'components/elements/clearfix';
import Link from 'components/elements/link';
import PageContainer from 'layout/default-sidebar-layout/PageContainer';
import createManagerListHoc from 'shared/hoc/manager-list';
import Icon from 'themes/icon';
import Slug from 'constants/slug';

@createManagerListHoc({
	apiCall: ManagerApi.getStationTransitsx,
	itemPerPage: 10,
})
@autobind
export default class TransitStationList extends PureComponent {
	static propTypes = {
		data: PropTypes.array,
		pagination: PropTypes.object,
		isLoading: PropTypes.bool,
		onChangePage: PropTypes.func,
		getIndexByPagination: PropTypes.func,
	};

	getHead() {
		return [{ content: 'Id', width: 10 }, { content: 'Name' }, { content: 'District' }];
	}

	getRows() {
		return this.props.data.map((row, index) => [
			{
				content: <strong>{index + 1}</strong>,
			},
			{
				content: (
					<div>
						<strong>{row.name}</strong>
						<br />
						<span>{row.address}</span>
					</div>
				),
			},
			{
				content: (
					<div>
						<span>{row.district}</span>
					</div>
				),
			},
		]);
	}

	render() {
		return (
			<PageContainer
				title="Danh sách bãi"
				right={
					<Link to={Slug.transitStation.create}>
						<Button appearance="primary" iconBefore={Icon.transport}>
							Tạo mới trạm
						</Button>
					</Link>
				}
			>
				<DynamicTable
					isFixedSize
					head={this.getHead()}
					rows={this.getRows()}
					pagination={this.props.pagination}
					onSetPage={this.props.onChangePage}
					isLoading={this.props.isLoading}
				/>
				<Clearfix height={64} />
			</PageContainer>
		);
	}
}
