import React from 'react'
import PageContainer from 'layout/default-sidebar-layout/PageContainer'
import { Button, Icon, Spin } from 'antd'
import { autobind } from 'core-decorators'
import StationAutoApi from 'api/StationAuto'
import StationAutoForm from '../station-auto-form'
import slug from '/constants/slug'
import createManagerDelete from 'hoc/manager-delete'
import createManagerEdit from 'hoc/manager-edit'
import PropTypes from 'prop-types'
import Breadcrumb from '../breadcrumb'
import { message } from 'antd'
import ROLE from 'constants/role'
import protectRole from 'hoc/protect-role'

@createManagerEdit({
    apiGetByKey: StationAutoApi.getStationAuto
  })
@autobind
export default class StationAutoFtpInfo extends React.PureComponent {
  static propTypes = {
    getItem: PropTypes.func,
    isLoaded: PropTypes.bool
  }

  //Su kien truoc khi component duoc tao ra
  async componentWillMount() {
    await this.props.getItem()
  }

  render() {
    return (
      <PageContainer {...this.props.wrapperProps}>
        <Breadcrumb
          items={[
            'list',
            {
              id: 'ftpInfo',
              name:
              this.props.isLoaded && this.props.success
                ? this.props.data.name 
                : null
            }
          ]}
        />
        <Spin style={{ width: '100%' }} spinning={!this.props.isLoaded}>
          {this.props.isLoaded &&
            this.props.success && (
             <div>
                 <div>Address ftp:</div>
                 <div>Username:</div>
                 <div>Password:</div>
             </div>
            )}
        </Spin>
      </PageContainer>
    )
  }
}
