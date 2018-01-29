import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { Table, Divider, Button, Icon, Form } from 'antd'
import StationAutoApi from 'api/StationAuto'
import PageContainer from 'layout/default-sidebar-layout/PageContainer'
import slug from 'constants/slug'
import { autobind } from 'core-decorators'
import createManagerList from 'hoc/manager-list'
import createManagerDelete from 'hoc/manager-delete'
import Breadcrumb from '../breadcrumb'
import { mapPropsToFields } from '../../../../utils/form'
import StationAutoSearchForm from '../station-auto-search'
import createLanguageHoc, { langPropTypes } from '../../../../hoc/create-lang'

@createManagerList({
  apiList: StationAutoApi.getStationAutos
})
@createManagerDelete({
  apiDelete: StationAutoApi.deleteStationAuto
})
@Form.create({
  mapPropsToFields: mapPropsToFields
})
@createLanguageHoc
@autobind
export default class StationAutoList extends React.Component {
  static propTypes = {
    dataSource: PropTypes.array,
    isLoading: PropTypes.bool,
    pagination: PropTypes.object,
    onChangePage: PropTypes.func,
    onChangePageSize: PropTypes.func,
    onDeleteItem: PropTypes.func,
    fetchData: PropTypes.func,
    onChangeSearch: PropTypes.func,
    data: PropTypes.object,
    lang: langPropTypes
  }

  buttonAdd() {
    return (
      <div>
        <Link to={slug.stationAuto.create}>
          <Button type="primary">
            <Icon type="plus" />Create
          </Button>
        </Link>
      </div>
    )
  }

  getColumns() {
    const { t } = this.props.lang
    return [
      {
        title: t('stationAutoManager.form.key.label'),
        dataIndex: 'key',
        key: 'key'
      },
      {
        title: t('stationAutoManager.form.name.label'),
        dataIndex: 'name.vi',
        key: 'name'
      },
      {
        title: t('stationAutoManager.form.type.label'),
        dataIndex: 'stationType',
        key: 'stationType'
      },
      {
        title: t('stationAutoManager.form.address.label'),
        dataIndex: 'address',
        key: 'address'
      },
      {
        title: '',
        key: 'action',
        render: (text, record) => (
          <span>
            <Link to={slug.stationAuto.editWithKey + '/' + record.key}>
              {' '}
              Edit{' '}
            </Link>
            <Divider type="vertical" />
            <a
              onClick={() =>
                this.props.onDeleteItem(record.key, this.props.fetchData)
              }
            >
              Delete
            </a>
          </span>
        )
      }
    ]
  }

  renderSearch() {
    return (
      <StationAutoSearchForm
        onChangeSearch={this.props.onChangeSearch}
        initialValues={this.props.data}
      />
    )
  }
  render() {
    return (
      <PageContainer center={this.renderSearch()} right={this.buttonAdd()}>
        <Breadcrumb items={['list']} />
        <Table
          size="small"
          loading={this.props.isLoading}
          columns={this.getColumns()}
          dataSource={this.props.dataSource}
          pagination={{
            showSizeChanger: true,
            onChange: this.props.onChangePage,
            onShowSizeChange: this.props.onChangePageSize,
            total: this.props.pagination.totalItem
          }}
        />
      </PageContainer>
    )
  }
}
