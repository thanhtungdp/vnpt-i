import React, { PureComponent } from 'react'
import PageContainer from 'layout/default-sidebar-layout/PageContainer'
import { postStationBurial } from 'api/StationApi'
import { withRouter } from 'react-router-dom'
import { autobind } from 'core-decorators'
import LandfillForm from '../landfill-form'
import slug from 'constants/slug'
import swal from 'sweetalert2'
import Icon from 'themes/icon'
import Breadcrumb from '../breadcrumb'

@withRouter
@autobind
export default class LandfillCreate extends PureComponent {
  static propTypes = {}

  async onSubmit(data) {
    const stationBurial = await postStationBurial(data)
    const context = this
    if (stationBurial.error) {
      swal({
        title: 'Error',
        type: 'error',
        text: stationBurial.message
      })
    } else {
      swal({
        title: 'Tạo trạm thành công',
        type: 'success'
      }).then(() => {
        context.props.history.push(slug.landFill.base)
      })
    }
  }

  render() {
    return (
      <PageContainer icon={Icon.create} title="Tạo bãi mới">
        <Breadcrumb items={['list', 'create']} />
        <LandfillForm onSubmit={this.onSubmit} />
      </PageContainer>
    )
  }
}
