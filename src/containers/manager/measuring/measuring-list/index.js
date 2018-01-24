import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { Table, Divider, Button, Icon } from 'antd'
import CategoryApi from 'api/CategoryApi'
import PageContainer from 'layout/default-sidebar-layout/PageContainer'
import slug from 'constants/slug'
import { autobind } from 'core-decorators'
import createManagerList from 'hoc/manager-list'
import createManagerDelete from 'hoc/manager-delete'
import createLanguage, { langPropTypes } from 'hoc/create-lang'
import Breadcrumb from '../breadcrumb'
import MeasuringSearchForm from "../measuring-search-form";

@createManagerList({
  apiList: CategoryApi.getMeasurings
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

  getColumns() {
    const { lang: { t } } = this.props
    return [
      {
        title: t('measuringManager.form.key.label'),
        dataIndex: 'key',
        key: 'key'
      },
      {
        title: t('measuringManager.form.name.label'),
        dataIndex: 'name.vi',
        key: 'name'
      },
      {
        title: t('measuringManager.form.unit.label'),
        dataIndex: 'unit',
        key: 'unit'
      },
      {
        title: '',
        key: 'action',
        render: (text, record) => (
          <span>
            <Link to={slug.measuring.editWithKey + '/' + record.key}>
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

  render() {
    return (
      <PageContainer
        right={this.buttonAdd()}
      >
        <Breadcrumb items={['list']} />
        <MeasuringSearchForm onChangeSearch={this.props.onChangeSearch} initialValues={this.props.data}/>
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
