import React from 'react'
import PageContainer from 'layout/default-sidebar-layout/PageContainer'
import { Button, Icon, Spin } from 'antd'
import { autobind } from 'core-decorators'
import CategoryApi from 'api/CategoryApi'
import StationTypeFrom from '../station-type-form'
import slug from '/constants/slug'
import createManagerDelete from 'hoc/manager-delete'
import createManagerEdit from 'hoc/manager-edit'
import PropTypes from 'prop-types'
import Breadcrumb from '../breadcrumb'
import ROLE from 'constants/role'
import protectRole from 'hoc/protect-role'
import { translate } from 'hoc/create-lang'

@protectRole(ROLE.STATION_TYPE.EDIT)
@createManagerDelete({
  apiDelete: CategoryApi.deleteStationType
})
@createManagerEdit({
  apiUpdate: CategoryApi.updateStationType,
  apiGetByKey: CategoryApi.getStationType
})
@autobind
export default class StationTypeEdit extends React.PureComponent {
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

  // Su kien xoa measuring
  deleteStationType() {
    const key = this.props.match.params.key
    this.props.onDeleteItem(key, () => {
      this.props.history.push(slug.stationType.list)
    })
  }

  buttonDelete() {
    return (
      <div>
        <Button type="primary" onClick={this.deleteStationType}>
          <Icon type="delete" />
          {translate('addon.delete')}
        </Button>
      </div>
    )
  }

  render() {
    return (
      <PageContainer button={this.buttonDelete()} {...this.props.wrapperProps}>
        <Spin spinning={!this.props.isLoaded}>
          <Breadcrumb
            items={[
              'list',
              {
                id: 'edit',
                name: this.props.isLoaded ? this.props.data.name : null
              }
            ]}
          />
          {this.props.isLoaded && (
            <StationTypeFrom
              initialValues={this.props.data}
              onSubmit={this.handleSubmit}
            />
          )}
        </Spin>
      </PageContainer>
    )
  }
}
