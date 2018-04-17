import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { Divider, Button, Icon } from 'antd'
import CategoryApi from 'api/CategoryApi'
import PageContainer from 'layout/default-sidebar-layout/PageContainer'
import slug from 'constants/slug'
import { autobind } from 'core-decorators'
import createManagerList from 'hoc/manager-list'
import createManagerDelete from 'hoc/manager-delete'
import protectRole from 'hoc/protect-role'
import createLanguage, { langPropTypes } from 'hoc/create-lang'
import DynamicTable from 'components/elements/dynamic-table'
import Breadcrumb from '../breadcrumb'
import MeasuringSearchForm from '../measuring-search'
import MeasuringSearchAdvancedForm from '../measuring-search/advanced'

@protectRole('menu.measuring.actions.view')
@createManagerList({
  apiList: CategoryApi.getMeasurings,
  itemPerPage: 10
})
@createManagerDelete({
  apiDelete: CategoryApi.deleteMeasuring
})
@createLanguage
@autobind
export default class MeasuringList extends React.Component {
  static propTypes = {
    dataSource: PropTypes.array,
    isLoading: PropTypes.bool,
    pagination: PropTypes.object,
    onChangePage: PropTypes.func,
    onChangePageSize: PropTypes.func,
    onDeleteItem: PropTypes.func,
    fetchData: PropTypes.func,
    lang: langPropTypes
  }

  state = {
    isAdvanced: false
  }

  toggleAdvanced() {
    this.setState({
      isAdvanced: !this.state.isAdvanced
    })
  }

  buttonAdd() {
    const { lang: { t } } = this.props
    return (
      <div>
        <Link to={slug.measuring.create}>
          <Button type="primary">
            <Icon type="plus" /> {t('addon.create')}
          </Button>
        </Link>
      </div>
    )
  }

  getHead() {
    return [
      { content: 'TT', width: 2 },
      { content: 'Key', width: 30 },
      { content: 'Name', width: 10 },
      { content: 'Unit', width: 10 },
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
        content: row.unit
      },
      {
        content: (
          <span>
            <Link to={slug.measuring.editWithKey + '/' + row._id}> Edit </Link>
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

  renderSearchForm() {
    return (
      <MeasuringSearchForm
        onChangeSearch={this.props.onChangeSearch}
        initialValues={this.props.data}
        isAdvanced={this.state.isAdvanced}
        onAdvanced={this.toggleAdvanced}
      />
    )
  }

  renderSearchAdvanced() {
    if (!this.state.isAdvanced) return null
    return (
      <MeasuringSearchAdvancedForm
        onChangeSearch={this.props.onChangeSearch}
        initialValues={this.props.data}
        onAdvanced={this.toggleAdvanced}
      />
    )
  }

  render() {
    return (
      <PageContainer
        center={this.renderSearchForm()}
        headerBottom={this.renderSearchAdvanced()}
        right={this.buttonAdd()}
      >
        <Breadcrumb items={['list']} />
        <DynamicTable
          isLoading={this.props.isLoading}
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
