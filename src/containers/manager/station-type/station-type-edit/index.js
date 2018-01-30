import React from 'react'
import PageContainer from 'layout/default-sidebar-layout/PageContainer'
import { Button, Icon } from 'antd'
import { autobind } from 'core-decorators'
import CategoryApi from 'api/CategoryApi'
import StationTypeFrom from '../station-type-form'
import slug from '/constants/slug'
import createManagerDelete from 'hoc/manager-delete'
import createManagerEdit from 'hoc/manager-edit'
import PropTypes from 'prop-types'
import Breadcrumb from '../breadcrumb'

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

  cleanData() {
    return {
      ...this.props.data
    }
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
          <StationTypeFrom
            initialValues={this.cleanData()}
            onSubmit={this.handleSubmit}
          />
        )}
      </PageContainer>
    )
  }
}
