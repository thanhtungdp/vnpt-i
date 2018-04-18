import React from 'react'
import PageContainer from 'layout/default-sidebar-layout/PageContainer'
import { Button, Icon } from 'antd'
import { autobind } from 'core-decorators'
import CategoryApi from 'api/CategoryApi'
import MeasuringForm from '../measuring-form'
import slug from '/constants/slug'
import createManagerDelete from 'hoc/manager-delete'
import createManagerEdit from 'hoc/manager-edit'
import createLanguage, { langPropTypes } from 'hoc/create-lang'
import PropTypes from 'prop-types'
import Breadcrumb from '../breadcrumb'
import ROLE from 'constants/role'
import protectRole from 'hoc/protect-role'

@protectRole(ROLE.MEASURING.EDIT)
@createManagerDelete({
  apiDelete: CategoryApi.deleteMeasuring
})
@createManagerEdit({
  apiUpdate: CategoryApi.updateMeasuring,
  apiGetByKey: CategoryApi.getMeasuring
})
@createLanguage
@autobind
export default class MeasuringEdit extends React.PureComponent {
  static propTypes = {
    onDeleteItem: PropTypes.func,
    onUpdateItem: PropTypes.func,
    getItem: PropTypes.func,
    isLoaded: PropTypes.bool,
    lang: langPropTypes
  }

  async handleSubmit(data) {
    this.props.onUpdateItem(data)
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
  deleteMeasuring() {
    const key = this.props.match.params.key
    this.props.onDeleteItem(key, () => {
      this.props.history.push(slug.measuring.list)
    })
  }

  buttonDelete() {
    return (
      <div>
        <Button type="primary" onClick={this.deleteMeasuring}>
          <Icon type="delete" /> {this.props.lang.t('addon.delete')}
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
          <MeasuringForm
            initialValues={this.cleanData()}
            onSubmit={this.handleSubmit}
            isEdit={true}
          />
        )}
      </PageContainer>
    )
  }
}
