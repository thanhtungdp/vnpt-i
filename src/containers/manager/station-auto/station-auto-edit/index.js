import React from 'react'
import PageContainer from 'layout/default-sidebar-layout/PageContainer'
import { Button, Icon } from 'antd'
import { autobind } from 'core-decorators'
import StationAutoApi from 'api/StationAuto'
import StationAutoForm from '../station-auto-form'
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
    this.props.onUpdateItem(data)
    //const key = this.props.match.params.key
  }

  //Su kien truoc khi component duoc tao ra
  async componentWillMount() {
    //const key = this.props.match.params.key
    this.props.getItem()
  }

  cleanData() {
    var data = {
      ...this.props.data,
      long: this.props.data.mapLocation
        ? this.props.data.mapLocation.long
        : null,
      lat: this.props.data.mapLocation ? this.props.data.mapLocation.lat : null
    }
    if (this.props.data.stationType) {
      data.stationType = this.props.data.stationType.key
      data.objStationType = this.props.data.stationType
    }
    data.measuringList = this.props.data.measuringList || []
    return data
  }

  deleteStationAuto() {
    const key = this.props.match.params.key
    this.props.onDeleteItem(key, () => {
      this.props.history.push(slug.stationAuto.list)
    })
  }

  buttonDelete() {
    return (
      <div>
        <Button type="primary" onClick={this.deleteStationAuto}>
          <Icon type="delete" />Delete
        </Button>
      </div>
    )
  }

  render() {
    return (
      <PageContainer button={this.buttonDelete()} {...this.props.wrapperProps}>
        <Breadcrumb
          items={[
            'list',
            {
              id: 'edit',
              name: this.props.isLoaded ? this.cleanData().name : null
            }
          ]}
        />
        {this.props.isLoaded && (
          <StationAutoForm
            initialValues={this.cleanData()}
            onSubmit={this.handleSubmit}
            isEdit={true}
          />
        )}
      </PageContainer>
    )
  }
}
