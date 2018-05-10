import React from 'react'
import PropTypes from 'prop-types'
import { autobind } from 'core-decorators'
import { Table } from 'antd'
import styled from 'styled-components'
import { translate } from 'hoc/create-lang'

const SubscriptionTableListWrapper = styled.div``

@autobind
export default class SubscriptionTableList extends React.PureComponent {
	static propTypes = {
		data: PropTypes.arrayOf(
			PropTypes.shape({
				subscriptionId: PropTypes.any,
				renewAt: PropTypes.any,
				expiredAt: PropTypes.any
			})
		)
	}

	getColumns() {
		return [
			{
				title: '#',
				dataIndex: 'Index',
				key: 'index',
				render(value, record, index) {
					return <span>{index + 1}</span>
				}
			},
			{
				title: 'ID',
				dataIndex: 'subscriptionId',
				key: 'subscriptionId',
				render(value, record) {
					return value
				}
			},
			{
				title: translate('subscriptionStatus.renewAt'),
				dataIndex: 'renewAt',
				key: 'renewAt',
				render(value) {
					return value
				}
			},
			{
				title: translate('subscriptionStatus.expiredAt'),
				dataIndex: 'expiredAt',
				key: 'expiredAt',
				render(value) {
					return value
				}
			}
		]
	}

	render() {
		return (
      <SubscriptionTableListWrapper>
        <Table
          size="small"
          rowKey="_id"
          columns={this.getColumns()}
					{...this.props}
          pagination={false}
        />
      </SubscriptionTableListWrapper>
		)
	}
}
