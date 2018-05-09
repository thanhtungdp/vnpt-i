import React, { PureComponent } from 'react'
import UserApi from 'api/UserApi'
import swal from 'sweetalert2'

export default class AccountActivate extends PureComponent {
  async componentWillMount() {
    const code = this.props.match.params.key
    const data = await UserApi.accountActivate(code)
    if (data.error) {
      let title = ''
      if (data.message === 'DATA_NOT_EXISTS') {
        title = 'Data not exists'
      } else if (data.message === 'ACCOUNT_ACTIVATED') {
        title = 'Account was activated'
      } else {
        title = data.message
      }
      swal({
        type: 'error',
        title: title
      })
    } else {
      swal({
        type: 'success',
        title: 'Congratulations. Your account is now active!'
      })
    }
    this.props.history.push('/')
  }

  render() {
    return <div />
  }
}
