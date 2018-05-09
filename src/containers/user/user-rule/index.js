import React from 'react'
import PropTypes from 'prop-types'
import { Table, Button, Checkbox, Form, Select, Row, Col, Spin } from 'antd'
import PageContainer from 'layout/default-sidebar-layout/PageContainer'
import { autobind } from 'core-decorators'
import Breadcrumb from '../breadcrumb'
import createLanguage, { langPropTypes } from 'hoc/create-lang'
import { message } from 'antd'
import StationAutoApi from 'api/StationAuto'
import RoleApi from 'api/RoleApi'
import UserApi from 'api/UserApi'
import ROLE from 'constants/role'
import protectRole from 'hoc/protect-role'

const FormItem = Form.Item
const Option = Select.Option

@protectRole(ROLE.USER.ROLE)
@createLanguage
@autobind
export default class RoleList extends React.Component {
  static propTypes = {
    pagination: PropTypes.object,
    pathImg: PropTypes.string,
    onChangePage: PropTypes.func,
    onChangePageSize: PropTypes.func,
    onDeleteItem: PropTypes.func,
    fetchData: PropTypes.func,
    lang: langPropTypes
  }
  constructor(props) {
    super(props)
    this.state = {
      isLoaded: false,
      dataStations: [],
      dataRoles: [],
      selectedRowKeys: [],
      selectedRows: [],
      selectedRole: {},
      isAdmin: false,
      userName: ''
    }
  }
  async componentWillMount() {
    const MAX_VALUE = 99999
    const key = this.props.match.params.key

    let stations = await StationAutoApi.getStationAutos(
      { itemPerPage: MAX_VALUE },
      {}
    )
    let roles = await RoleApi.getRoles({ itemPerPage: MAX_VALUE })
    if (roles.error) message.error(roles.message)
    let user = await UserApi.getOne(key)

    this.setState({
      isLoaded: true,
      dataStations: stations && stations.data ? stations.data : [],
      dataRoles: roles && roles.data ? roles.data : [],
      selectedRole:
        user.success && user.data.role ? user.data.role : { _id: '' },
      selectedRows:
        user.success && user.data.stationAutos ? user.data.stationAutos : [],
      selectedRowKeys:
        user.success && user.data.stationAutos
          ? user.data.stationAutos.map(item => item.key)
          : [],
      isAdmin: user.success && user.data.isAdmin ? user.data.isAdmin : false,
      userName:
        user.success && user.data.firstName
          ? user.data.firstName + user.data.lastName
          : ''
    })
  }

  async handleSubmit(e) {
    const { lang: { t } } = this.props
    e.preventDefault()
    this.setState({
      isLoading: true
    })
    let data = {
      role: this.state.selectedRole,
      stationAutos: this.state.selectedRows.map(item => {
        delete item.lastLog
        return item
      }),
      isAdmin: this.state.isAdmin
    }

    const key = this.props.match.params.key
    const res = await UserApi.updateRole(key, data)
    this.setState({
      isLoading: false
    })
    if (res.success) message.info(t('userRule.message.success'))
    else message.info(res.message)
  }

  getColumns() {
    const { lang: { t } } = this.props
    return [
      {
        title: t('userRule.name.label'),
        dataIndex: 'name'
      },
      {
        title: t('userRule.address.label'),
        dataIndex: 'address'
      }
    ]
  }

  onSelectChange = (selectedRowKeys, selectedRows) => {
    this.setState({ selectedRowKeys, selectedRows })
  }

  onChangeRole(value) {
    this.setState({
      selectedRole: this.state.dataRoles.find(item => item._id === value)
    })
  }

  onChangeIsAdmin(e) {
    this.setState({
      isAdmin: e.target.checked
    })
  }

  render() {
    const { selectedRowKeys } = this.state
    const { lang: { t } } = this.props
    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange
    }
    return (
      <Form onSubmit={this.handleSubmit}>
        <PageContainer>
          <Spin spinning={!this.state.isLoaded} delay={500}>
            <Breadcrumb
              items={[
                'list',
                {
                  id: t('userRule.role.label'),
                  name: this.state.isLoaded ? this.state.userName : ''
                }
              ]}
            />
            <Row gutter={16}>
              <Col span={12}>
                <FormItem
                  label={t('userRule.role.label')}
                  labelCol={{ span: 2 }}
                  wrapperCol={{ span: 10 }}
                >
                  <Select
                    style={{ width: 240 }}
                    onChange={this.onChangeRole}
                    value={this.state.selectedRole._id}
                  >
                    {this.state.dataRoles.map(role => (
                      <Option key={role._id} value={role._id}>
                        {' '}
                        {role.name}
                      </Option>
                    ))}
                  </Select>
                </FormItem>
              </Col>
              <Col span={12}>
                <FormItem>
                  <Checkbox
                    checked={this.state.isAdmin}
                    onChange={this.onChangeIsAdmin}
                  >
                    {t('userRule.role.isAdmin')}
                  </Checkbox>
                </FormItem>
              </Col>
            </Row>

            <Table
              rowSelection={rowSelection}
              loading={!this.state.isLoaded}
              columns={this.getColumns()}
              dataSource={this.state.dataStations}
              pagination={{
                pageSize: 1000,
                hideOnSinglePage: true
              }}
            />
            <br />
            <FormItem>
              <Button
                style={{ width: '100%' }}
                type="primary"
                htmlType="submit"
                loading={this.state.isLoading}
              >
                {t('addon.save')}
              </Button>
            </FormItem>
          </Spin>
        </PageContainer>
      </Form>
    )
  }
}
