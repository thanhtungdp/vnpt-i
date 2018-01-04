import React, { PureComponent } from 'react'
import PageContainer from 'layout/default-sidebar-layout/PageContainer'
import { postStationTransit } from 'api/StationApi'
import { withRouter } from 'react-router-dom'
import { autobind } from 'core-decorators'
import TransitStationForm from '../transit-station-form/index'
import slug from 'constants/slug'
import swal from 'sweetalert2'
import Icon from 'themes/icon'
import Breadcrumb from '../breadcrumb'

@withRouter
@autobind
export default class TransitStationCreate extends PureComponent {
  static propTypes = {}

  async onSubmit(data) {
    const transitStation = await postStationTransit(data)
    const context = this
    if (transitStation.error) {
      swal({
        title: 'Error',
        type: 'error',
        text: transitStation.message
      })
    } else {
      swal({
        title: 'Tạo trạm thành công',
        type: 'success'
      }).then(() => {
        context.props.history.push(slug.stationTransit.base)
      })
    }
  }

  render() {
    return (
      <PageContainer icon={Icon.create} title="Tạo bãi mới">
        <Breadcrumb items={['list', 'create']} />
        <TransitStationForm onSubmit={this.onSubmit} />
      </PageContainer>
    )
  }
}
