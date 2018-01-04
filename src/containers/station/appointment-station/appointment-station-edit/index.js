import React, { PureComponent } from 'react'
import PageContainer from 'layout/default-sidebar-layout/PageContainer'
import StationApi from 'api/StationApi'
import AppointmentStationForm from '../appointment-station-form/index'
import swal from 'sweetalert2'
import Icon from 'themes/icon'
import Breadcrumb from '../breadcrumb'

export default class AppointmentStationEdit extends PureComponent {
  state = {
    loaded: false,
    submitting: false,
    dataEdit: {}
  }

  static propTypes = {}

  async componentWillMount() {
    const _id = this.props.match.params._id
    const record = await StationApi.getStationAppointment(_id)
    this.setState({
      loaded: true,
      dataEdit: {
        ...record,
        lat: record.mapLocation.lat,
        long: record.mapLocation.long
      }
    })
  }

  async onSubmit(data) {
    const _id = data._id
    const res = await StationApi.putStationAppointment(_id, data)
    if (res.error) {
      swal({
        title: 'Error',
        type: 'error',
        text: res.message
      })
    } else {
      swal({
        type: 'success',
        title: 'Cập nhật thành công'
      })
    }
  }

  render() {
    return (
      <PageContainer icon={Icon.edit} title="Sửa bãi">
        <Breadcrumb
          items={[
            'list',
            {
              id: 'edit',
              href: '',
              name: this.state.dataEdit.name
            }
          ]}
        />
        {this.state.loaded && (
          <AppointmentStationForm
            isEdit={true}
            onSubmit={this.onSubmit}
            initialValues={this.state.dataEdit}
          />
        )}
      </PageContainer>
    )
  }
}
