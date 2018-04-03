import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { Table, Divider, Button, Icon } from 'antd'
import PageContainer from 'layout/default-sidebar-layout/PageContainer'
import slug from 'constants/slug'
import { autobind } from 'core-decorators'
import createManagerList from 'hoc/manager-list'
import createManagerDelete from 'hoc/manager-delete'
import Breadcrumb from '../breadcrumb'
import UserSearchForm from '../user-search-form'
import createLanguageHoc, { langPropTypes } from '../../../hoc/create-lang'
import UserApi from 'api/UserApi'
import ReactCountryFlag from 'react-country-flag'

@createManagerList({
  apiList: UserApi.searchUser
})
@createManagerDelete({
  apiDelete: UserApi.deleteOne
})
@createLanguageHoc
@autobind
export default class UserList extends React.Component {
  static propTypes = {
    pagination: PropTypes.object,
    pathImg: PropTypes.string,
    onChangePage: PropTypes.func,
    onChangePageSize: PropTypes.func,
    onDeleteItem: PropTypes.func,
    fetchData: PropTypes.func,
    lang: langPropTypes
  }

  async componentWillMount() {}

  buttonAdd() {
    return (
      <div>
        <Link to={slug.user.create}>
          <Button type="primary">
            <Icon type="plus" />Create
          </Button>
        </Link>
      </div>
    )
  }

  getColumns() {
    const { lang: { t } } = this.props
    return [
      {
        title: t('userSearchFrom.form.email.label'),
        dataIndex: 'email',
        key: 'email',
        render: (text, record) => (
          <div>
            {record.phone &&
              record.phone.iso2 && (
                <span style={{ fontSize: 20 }}>
                  {' '}
                  <ReactCountryFlag code={record.phone.iso2} />
                </span>
              )}
            <span>{text}</span>
          </div>
        )
      },
      {
        title: t('userSearchFrom.form.organization.label'),
        dataIndex: 'organization',
        key: 'organization',
        render: (text, record) => (
          <span> {record.organization ? record.organization.name : ''}</span>
        )
      },
      {
        title: '',
        key: 'action',
        render: (text, record) => (
          <span>
            <Link to={slug.user.editWithKey + '/' + record._id}> Edit </Link>
            <Divider type="vertical" />
            <a
              onClick={() =>
                this.props.onDeleteItem(record._id, this.props.fetchData)
              }
            >
              Delete
            </a>
            <Divider type="vertical" />
            <Link to={slug.user.ruleWithKey + '/' + record._id}> Rule </Link>
          </span>
        )
      }
    ]
  }

  render() {
    return (
      <PageContainer right={this.buttonAdd()}>
        <Breadcrumb items={['list']} />
        <UserSearchForm
          onChangeSearch={query => {
            this.props.onChangeSearch({}, query)
          }}
          initialValues={this.props.data}
        />
        <Table
          rowKey="_id"
          loading={this.props.isLoading}
          columns={this.getColumns()}
          dataSource={this.props.dataSource}
          pagination={{
            showSizeChanger: true,
            onChange: this.props.onChangePage,
            onShowSizeChange: this.props.onChangePageSize,
            total: this.props.pagination.totalItem,
            current: this.props.pagination.page
          }}
        />
      </PageContainer>
    )
  }
}
