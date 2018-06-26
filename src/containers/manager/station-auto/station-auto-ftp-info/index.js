import React from 'react'
import PageContainer from 'layout/default-sidebar-layout/PageContainer'
import { Spin, Button, message } from 'antd'
import { autobind } from 'core-decorators'
import StationAutoApi from 'api/StationAuto'
import createManagerEdit from 'hoc/manager-edit'
import PropTypes from 'prop-types'
import Breadcrumb from '../breadcrumb'
import FtpApi from 'api/FtpApi'
import { translate } from 'hoc/create-lang'
import swal from 'sweetalert2'
import { connect } from 'react-redux'

@connect(state => ({
  organization: state.auth.userInfo.organization
}))
@createManagerEdit({
  apiGetByKey: StationAutoApi.getStationAuto
})
@autobind
export default class StationAutoFtpInfo extends React.PureComponent {
  static propTypes = {
    getItem: PropTypes.func,
    isLoaded: PropTypes.bool
  }
  constructor(props) {
    super(props)
    this.state = {
      existFTP: true,
      isLoadingButton: false
    }
  }

  //Su kien truoc khi component duoc tao ra
  async componentWillMount() {
    await this.props.getItem()
    if (this.props.isLoaded && this.props.success)
      this.handelInfoFTP(this.props.data.configLogger.path)
  }

  async handelInfoFTP(path) {
    if (!path) {
      path = this.props.organization.ftpPath + '/' + this.props.data.key
      let config = {
        ...this.props.data.configLogger,
        path: path
      }
      StationAutoApi.updateStationAutoConfig(this.props.data._id, config)
    }
    let resFTP = await FtpApi.getInfoByPath(path)
    if (resFTP.success) {
      this.setState({
        existFTP: true,
        address: resFTP.data.address,
        username: resFTP.data.username,
        password: resFTP.data.password
      })
    } else {
      this.setState({
        existFTP: false
      })
    }
  }

  async createFTPFolder() {
    this.setState({
      isLoadingButton: true
    })
    let resFTP = await FtpApi.createFTPFolder({
      path: this.props.data.configLogger.path
    })
    if (resFTP.success) {
      this.handelInfoFTP(this.props.data.configLogger.path)
      swal({
        type: 'success',
        text: translate('stationAutoManager.ftpFile.createFTPSuccess')
      })
      // this.setState({
      //   existFTP: true,
      //   address: resFTP.data.address,
      //   username: resFTP.data.username,
      //   password: resFTP.data.password,
      //   isLoadingButton: false
      // })
    } else {
      message.error(resFTP.message)
      this.setState({
        isLoadingButton: false
      })
    }
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
                  ? translate('stationAutoManager.ftpFile.headerName') +
                    this.props.data.name
                  : null
            }
          ]}
        />
        <Spin style={{ width: '100%' }} spinning={!this.props.isLoaded}>
          {this.props.isLoaded &&
            this.props.success &&
            this.state.existFTP && (
              <table>
                <tbody>
                  <tr>
                    <td style={{ width: 100 }}>
                      <b>
                        {translate('stationAutoManager.ftpFile.addressLabel')}
                      </b>
                    </td>
                    <td style={{ color: 'blue' }}>{this.state.address}</td>
                  </tr>
                  <tr>
                    <td>
                      <b>
                        {translate('stationAutoManager.ftpFile.usernameLabel')}
                      </b>
                    </td>
                    <td style={{ color: 'blue' }}>{this.state.username}</td>
                  </tr>
                  <tr>
                    <td>
                      <b>
                        {translate('stationAutoManager.ftpFile.passwordLabel')}
                      </b>
                    </td>
                    <td style={{ color: 'blue' }}>{this.state.password}</td>
                  </tr>
                </tbody>
              </table>
            )}
          {this.props.isLoaded &&
            this.props.success &&
            !this.state.existFTP && (
              <div>
                <h4>{translate('stationAutoManager.ftpFile.NOT_EXIST_FTP')}</h4>
                <Button
                  loading={this.state.isLoadingButton}
                  type="primary"
                  size="large"
                  onClick={this.createFTPFolder}
                >
                  {translate('stationAutoManager.ftpFile.buttonCreateFTP')}
                </Button>
              </div>
            )}
        </Spin>
      </PageContainer>
    )
  }
}
