import React from 'react'
import PropTypes from 'prop-types'
import { Table, Button, Checkbox, Form, Select } from 'antd'
import PageContainer from 'layout/default-sidebar-layout/PageContainer'
import slug from 'constants/slug'
import update from 'react-addons-update'
import { autobind } from 'core-decorators'
import Breadcrumb from '../breadcrumb'
import createLanguage, { langPropTypes } from 'hoc/create-lang'
import { message } from 'antd'
import StationAutoApi from 'api/StationAuto'
import RoleApi from 'api/RoleApi'
import UserApi from 'api/UserApi'

const FormItem = Form.Item
const Option = Select.Option;

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
            dataStations: [],
            dataRoles: [],
            selectedRowKeys: [],
            selectedRows: [],
            selectedRole: {}
        }
    }
    async componentWillMount() {
        const MAX_VALUE = 99999
        const key = this.props.match.params.key

        let stations = await StationAutoApi.getStationAutos({ itemPerPage: MAX_VALUE }, {})
        let roles = await RoleApi.getRole({ itemPerPage: MAX_VALUE }, {})
        let user = await UserApi.getOne(key)

        console.log(user)
        this.setState({
            dataStations: (stations && stations.data) ? stations.data : [],
            dataRoles: (roles && roles.data) ? roles.data : []
        })
    }

    async handleSubmit(e) {
        e.preventDefault()
        let data = {
            role: this.state.selectedRole,
            stationAuto: this.state.selectedRows.map(item => {
                delete item.lastLog
                return item
            })
        }
        const key = this.props.match.params.key
        const res = { success: true }//await UserApi.updateRole(key, data)
        if (res.success)
            message.info('Update Rule User success!')
        else
            message.info(res.message)
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
        this.setState({ selectedRowKeys, selectedRows });
    }

    onChangeRole(value) {
        this.setState({
            selectedRole: this.state.dataRoles.find(item => item._id === value)
        })
    }

    render() {
        const { loading, selectedRowKeys } = this.state;
        const { lang: { t } } = this.props
        const rowSelection = {
            selectedRowKeys,
            onChange: this.onSelectChange,
        };
        return (
            <Form onSubmit={this.handleSubmit}>
                <PageContainer>
                    <Breadcrumb
                        items={[
                            'list',
                            {
                                id: t('userRule.role.label'),
                                name: 'aaaaaa'
                            }
                        ]}
                    />
                    <FormItem label={t('userRule.role.label')} labelCol={{ span: 1 }} wrapperCol={{ span: 12 }}>
                        <Select defaultValue="lucy" style={{ width: 240 }} onChange={this.onChangeRole}>
                            {this.state.dataRoles.map((role) => <Option
                                key={role._id}
                                value={role._id}
                            > {role.name}
                            </Option>
                            )}
                        </Select>
                    </FormItem>

                    <Table
                        rowSelection={rowSelection}
                        loading={this.props.isLoading}
                        columns={this.getColumns()}
                        dataSource={this.state.dataStations}
                        pagination={{
                            pageSize: 1000,
                            hideOnSinglePage: true
                        }}
                    />
                    <br />
                    <FormItem>
                        <Button style={{ width: '100%' }} type="primary" htmlType="submit">
                            Save
            </Button>
                    </FormItem>
                </PageContainer>
            </Form>
        )
    }
}
