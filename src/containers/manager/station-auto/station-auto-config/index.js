import React from 'react'
import PageContainer from 'layout/default-sidebar-layout/PageContainer'
import { message } from 'antd'
import { autobind } from 'core-decorators'
import StationAutoApi from 'api/StationAuto'
import StationAutoConfigForm from '../station-auto-configForm'
import slug from '/constants/slug'
import createManagerDelete from 'hoc/manager-delete'
import createManagerEdit from 'hoc/manager-edit'
import PropTypes from 'prop-types'
import Breadcrumb from '../breadcrumb'

@createManagerDelete({
  apiDelete: StationAutoApi.deleteStationAuto
})
@createManagerEdit({
  apiUpdate: StationAutoApi.updateStationAuto,
  apiGetByKey: StationAutoApi.getStationAuto
})
@autobind
export default class StationAutoEdit extends React.PureComponent {
  static propTypes = {
    onDeleteItem: PropTypes.func,
    onUpdateItem: PropTypes.func,
    getItem: PropTypes.func,
    isLoaded: PropTypes.bool
  }

  async handleSubmit(data) {
    const key = this.props.match.params.key
    const res = await StationAutoApi.updateStationAutoConfig(key, data)
    if (res.success) {
      message.info(
        this.props.lang.t('stationAutoManager.config.message.success')
      )
      this.props.history.push(slug.stationAuto.list)
    } else
      message.error(
        this.props.lang.t('stationAutoManager.config.message.error')
      )
  }

  //Su kien truoc khi component duoc tao ra
  async componentWillMount() {
    //const key = this.props.match.params.key
    this.props.getItem()
  }

  render() {
    return (
      <PageContainer {...this.props.wrapperProps}>
        <Breadcrumb
          items={[
            'list',
            {
              id: 'edit',
              name:
                this.props.isLoaded && this.props.data
                  ? this.props.data.name
                  : null
            }
          ]}
        />
        {this.props.isLoaded && (
          <StationAutoConfigForm
            initialValues={
              this.props.data && this.props.data.configLogger
                ? this.props.data.configLogger
                : { measuringList: [] }
            }
            measuringListSource={
              this.props.data && this.props.data.measuringList
                ? this.props.data.measuringList
                : []
            }
            onSubmit={this.handleSubmit}
          />
        )}
      </PageContainer>
    )
  }
}
