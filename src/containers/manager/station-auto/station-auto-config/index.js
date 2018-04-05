import React from 'react'
import PageContainer from 'layout/default-sidebar-layout/PageContainer'
import { message, Collapse, Button, Form, Spin } from 'antd'
import { autobind } from 'core-decorators'
import StationAutoApi from 'api/StationAuto'
import StationAutoConfigForm from '../station-auto-configForm'
import StationAutoConfigOptions from '../station-auto-configOptions'
import slug from '/constants/slug'
import createManagerDelete from 'hoc/manager-delete'
import createManagerEdit from 'hoc/manager-edit'
import PropTypes from 'prop-types'
import Breadcrumb from '../breadcrumb'
import { mapPropsToFields } from 'utils/form'

const FormItem = Form.Item

const Panel = Collapse.Panel
@createManagerDelete({
  apiDelete: StationAutoApi.deleteStationAuto
})
@createManagerEdit({
  apiUpdate: StationAutoApi.updateStationAuto,
  apiGetByKey: StationAutoApi.getStationAuto
})
@Form.create({
  mapPropsToFields: mapPropsToFields
})
@autobind
export default class StationAutoEdit extends React.PureComponent {
  static propTypes = {
    onDeleteItem: PropTypes.func,
    onUpdateItem: PropTypes.func,
    getItem: PropTypes.func,
    isLoaded: PropTypes.bool
  }

  constructor(props) {
    super(props)
    this.state = {
      isSubmitting: false
    }
  }

  async handleSubmit() {
    this.setState({
      isSubmitting: true
    })

    let data
    this.props.form.validateFields((err, values) => {
      if (err) return
      let dataConfig = this.getDataConfigForm(values)
      let dataOptions = this.getDataOptionsForm(values)
      data = {
        options: dataOptions,
        configLogger: dataConfig
      }
    })

    if (data) {
      const key = this.props.match.params.key
      const res = await StationAutoApi.updateStationAutoConfig(key, data)
      if (res.success) {
        message.info(
          this.props.lang.t('stationAutoManager.config.message.success')
        )
      } else
        message.error(
          this.props.lang.t('stationAutoManager.config.message.error')
        )
    }
    this.setState({
      isSubmitting: false
    })
  }

  //Su kien truoc khi component duoc tao ra
  async componentWillMount() {
    //const key = this.props.match.params.key
    await this.props.getItem()
  }

  getDataOptionsForm(values) {
    let data
    data = {
      warning: {
        allowed: values.allowSendWarning ? values.allowSendWarning : false
      },
      sampling: {
        allowed: values.allowSampling ? values.allowSampling : false,
        apiAddress: values.apiAddress
      },
      camera: {
        allowed: values.allowCamera ? values.allowCamera : false,
        list: values.list ? values.list : []
      }
    }
    if (!data.sampling.allowed) delete data.sampling.apiAddress
    if (!data.camera.allowed) delete data.camera.list
    return data
  }
  getDataConfigForm(values) {
    let data
    data = {
      fileName: values.fileName,
      path: values.path,
      measuringList: values.measuringList.filter(
        item => item.measuringDes && item.measuringDes !== ''
      )
    }
    return data
  }

  render() {
    const { t } = this.props.lang
    return (
      <PageContainer {...this.props.wrapperProps}>
        <Spin spinning={!this.props.isLoaded} delay={500}>
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
          <Collapse defaultActiveKey={['1', '2']}>
            <Panel header="Options" key="1">
              {this.props.isLoaded && (
                <StationAutoConfigOptions
                  form={this.props.form}
                  ref={comp => (this.optionsForm = comp)}
                  initialValues={
                    this.props.data && this.props.data.options
                      ? this.props.data.options
                      : {}
                  }
                />
              )}
            </Panel>
            <Panel header="DataLogger" key="2">
              {this.props.isLoaded && (
                <StationAutoConfigForm
                  form={this.props.form}
                  ref={comp => (this.configForm = comp)}
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
                />
              )}
            </Panel>
          </Collapse>
          <FormItem>
            <Button
              loading={this.state.isSubmitting}
              style={{ width: '100%' }}
              type="primary"
              htmlType="submit"
              onClick={this.handleSubmit}
            >
              {t('addon.save')}
            </Button>
          </FormItem>
        </Spin>
      </PageContainer>
    )
  }
}
