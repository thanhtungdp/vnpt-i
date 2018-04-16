import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { Table, Divider, Button, Icon, Avatar, Checkbox } from 'antd'
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

  getColumns(path) {
    const { lang: { t } } = this.props
    return [
      {
        title: t('stationTypeManager.form.key.label'),
        dataIndex: 'key',
        key: 'key'
      },
      {
        title: t('stationTypeManager.form.name.label'),
        dataIndex: 'name',
        key: 'name'
      },
      {
        title: t('stationTypeManager.form.icon.label'),
        dataIndex: 'icon',
        key: 'icon',
        render: (text, record) => (
          <AvatarWrapper>
            <Avatar
              shape="square"
              size="large"
              style={{
                backgroundColor: record.color,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
              src={text}
            >
              Icon
            </Avatar>
          </AvatarWrapper>
        )
      },
      {
        title: t('stationTypeManager.form.auto.label'),
        dataIndex: 'isAuto',
        key: 'isAuto',
        render: (text, record) => (
          <Checkbox disabled={true} checked={record.isAuto} />
        )
      },
      {
        title: '',
        key: 'action',
        render: (text, record) => (
          <span>
            <Link to={slug.stationType.editWithKey + '/' + record._id}>
              {' '}
              Edit{' '}
            </Link>
            <Divider type="vertical" />
            <a
              onClick={() =>
                this.props.onDeleteItem(record._id, this.props.fetchData)
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
      <PageContainer right={this.buttonAdd()}>
        <Breadcrumb items={['list']} />
        <StationTypeSearchForm
          onChangeSearch={this.props.onChangeSearch}
          initialValues={this.props.data}
        />
        <Table
          loading={this.props.isLoading}
          columns={this.getColumns(this.props.pathImg)}
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
