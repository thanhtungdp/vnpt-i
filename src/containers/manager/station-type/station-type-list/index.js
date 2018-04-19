import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { Divider, Button, Icon, Avatar, Checkbox } from 'antd'
import CategoryApi from 'api/CategoryApi'
import PageContainer from 'layout/default-sidebar-layout/PageContainer'
import slug from 'constants/slug'
import { autobind } from 'core-decorators'
import createManagerList from 'hoc/manager-list'
import createManagerDelete from 'hoc/manager-delete'
import Breadcrumb from '../breadcrumb'
import StationTypeSearchForm from '../station-type-search-form'
import createLanguageHoc, { langPropTypes } from '../../../../hoc/create-lang'
import styled from 'styled-components'
import DynamicTable from 'components/elements/dynamic-table'

const AvatarWrapper = styled.div`
  .ant-avatar {
    height: 40px;
    width: 40px;
  }
  .ant-avatar > img {
    padding: 4px;
    height: auto;
  }
`

@createManagerList({
	apiList: CategoryApi.getStationTypes
})
@createManagerDelete({
	apiDelete: CategoryApi.deleteStationType
})
@createLanguageHoc
@autobind
export default class StationTypeList extends React.Component {
	static propTypes = {
		dataSource: PropTypes.array,
		isLoading: PropTypes.bool,
		pagination: PropTypes.object,
		pathImg: PropTypes.string,
		onChangePage: PropTypes.func,
		onChangePageSize: PropTypes.func,
		onDeleteItem: PropTypes.func,
		fetchData: PropTypes.func,
		lang: langPropTypes
	}

	buttonAdd() {
		return (
      <div>
        <Link to={slug.stationType.create}>
          <Button type="primary">
            <Icon type="plus" />Create
          </Button>
        </Link>
      </div>
		)
	}

	renderSearchForm() {
		return (
      <StationTypeSearchForm
        onChangeSearch={this.props.onChangeSearch}
        initialValues={this.props.data}
      />
		)
	}

	getHead() {
		const { lang: { t } } = this.props
		return [
			{ content: '#', width: 2 },
			{ content: t('stationTypeManager.form.key.label'), width: 10 },
			{ content: t('stationTypeManager.form.name.label'), width: 30 },
			{ content: t('stationTypeManager.form.icon.label'), width: 10 },
			{ content: t('stationTypeManager.form.auto.label'), width: 10 },
			{ content: 'Action', width: 10 }
		]
	}

	getRows() {
		return this.props.dataSource.map((row, index) => [
			{
				content: (
          <strong>
						{(this.props.pagination.page - 1) *
						this.props.pagination.itemPerPage +
						index +
						1}
          </strong>
				)
			},
			{
				content: row.key
			},
			{
				content: row.name
			},
			{
				content: (
          <AvatarWrapper>
            <Avatar
              shape="square"
              size="large"
              style={{
								backgroundColor: row.color,
								display: 'flex',
								alignItems: 'center',
								justifyContent: 'center'
							}}
              src={row.icon}
            >
              Icon
            </Avatar>
          </AvatarWrapper>
				)
			},
			{
				content: <Checkbox disabled={true} checked={row.isAuto} />
			},
			{
				content: (
          <span>
            <Link to={slug.stationType.editWithKey + '/' + row._id}>
              {' '}
              Edit{' '}
            </Link>
            <Divider type="vertical" />
            <a
              onClick={() =>
								this.props.onDeleteItem(row._id, this.props.fetchData)
							}
            >
              Delete
            </a>
          </span>
				)
			}
		])
	}

	render() {
		return (
      <PageContainer center={this.renderSearchForm()} right={this.buttonAdd()}>
        <Breadcrumb items={['list']} />
        <DynamicTable
          loading={this.props.isLoading}
          rows={this.getRows()}
          head={this.getHead()}
          paginationOptions={{
						isSticky: true
					}}
          onSetPage={this.props.onChangePage}
          pagination={this.props.pagination}
        />
      </PageContainer>
		)
	}
}
