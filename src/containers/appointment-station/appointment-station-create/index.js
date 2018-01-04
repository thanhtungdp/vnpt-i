import React, { PureComponent } from 'react'
import PageContainer from 'layout/default-sidebar-layout/PageContainer'
import { withRouter } from 'react-router-dom'
import { autobind } from 'core-decorators'
import AppointmentStationForm from '../appointment-station-form'
import slug from 'constants/slug'
import swal from 'sweetalert2'
import Icon from 'themes/icon'
import Breadcrumb from '../breadcrumb'
import { postStationAppointment } from 'api/StationApi'

@withRouter
@autobind
export default class AppointmentStationCreate extends PureComponent {
  static propTypes = {}

  async onSubmit(data) {
    const appointmentStation = await postStationAppointment(data)
    const context = this
    if (appointmentStation.error) {
      swal({
        title: 'Error',
        type: 'error',
        text: appointmentStation.message
      })
    } else {
      swal({
        title: 'Tạo điểm thành công',
        type: 'success'
      }).then(() => {
        context.props.history.push(slug.staionAppointment.base)
      })
    }
  }

  render() {
    return (
      <PageContainer icon={Icon.create} title="Tạo điểm hẹn">
        <Breadcrumb items={['list', 'create']} />
        <AppointmentStationForm onSubmit={this.onSubmit} />
      </PageContainer>
    )
  }
}
