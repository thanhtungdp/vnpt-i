import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Switch } from 'antd'
import swal from 'sweetalert2'
import objectPath from 'object-path'
import AuthApi from 'api/AuthApi'
import { translate } from 'hoc/create-lang'
import PageContainer from 'layout/default-sidebar-layout/PageContainer'
import { autobind } from 'core-decorators'
import Breadcrumb from 'containers/auth/breadcrumb'
import { fetchUserMe } from 'redux/actions/authAction'
import { connectAutoDispatch } from 'redux/connect'
import styled from 'styled-components'

const Note = styled.i`
  font-size: 12px;
`

@autobind
export class SecurityForm extends PureComponent {
  static propTypes = {
    onChange: PropTypes.func,
    initialValues: PropTypes.object
  }
  constructor(props) {
    super(props)
    this.state = {
      enable: objectPath.get(props.initialValues, 'twoFactorAuth.enable')
    }
  }

  render() {
    return (
      <div>
        <strong>{translate('security.label')} </strong>
        <Switch
          checkedChildren="On"
          unCheckedChildren="Off"
          checked={this.state.enable}
          onChange={checked => {
            this.setState({
              enable: checked
            })
            this.props.onChange(checked)
          }}
        />
        <div>
          <Note>
            If you turn on Two-Factor Authentication feature, The system will
            send the verify code to your email address every time you sign in to
            app iLotusLand.
          </Note>
        </div>
      </div>
    )
  }
}

@connectAutoDispatch(state => ({}), { fetchUserMe })
@autobind
export default class Security extends PureComponent {
  static propTypes = {
    onSubmit: PropTypes.func
  }

  constructor(props) {
    super(props)
    this.state = {
      userInfo: {},
      isLoaded: false
    }
  }

  async componentWillMount() {
    const record = await AuthApi.getMe()
    this.setState({
      userInfo: {
        ...record.data
      },
      isLoaded: true
    })
  }

  async onChange(enable) {
    const data = { enable }
    const result = await AuthApi.putSecurity(data)
    if (result.error) {
      swal({
        type: 'error',
        title: result.message
      })
    } else {
      swal({
        type: 'success',
        title: translate('security.success')
      })
    }
  }

  render() {
    return (
      <PageContainer {...this.props.wrapperProps}>
        <Breadcrumb items={['security']} />
        {this.state.isLoaded && (
          <SecurityForm
            onChange={this.onChange}
            initialValues={this.state.userInfo}
          />
        )}
      </PageContainer>
    )
  }
}
