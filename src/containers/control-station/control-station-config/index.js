import React, { PureComponent } from 'react'
import { Form, Row, Col, Button, message } from 'antd'
import PropTypes from 'prop-types'
import { mapPropsToFields } from 'utils/form'
import { autobind } from 'core-decorators'
import createLanguage, { langPropTypes } from 'hoc/create-lang/index'
import InputLabel from 'components/elements/input-label/index'
import InputNumberCell from 'components/elements/input-number-cell/index'
import Clearfix from 'components/elements/clearfix/index'
import StationControl from 'api/StationControl'

const FormItem = Form.Item

@Form.create({
  mapPropsToFields: mapPropsToFields
})
@createLanguage
@autobind
export default class ControlStationConfig extends PureComponent {
  static propTypes = {
    stationKey: PropTypes.string,
    stationName: PropTypes.string,
    lang: langPropTypes,
    isEdit: PropTypes.bool
  }

  handleSubmit() {
    this.save(true)
  }
  handleReset() {
    this.save(false)
  }

  async save(config) {
    let data
    this.props.form.validateFields((err, values) => {
      if (err) return
      data = {
        config: config, //tạo hay reset
        stationKey: this.props.stationKey,
        stationName: this.props.stationName,
        mt_Name: values.tagName,
        total: values.total
      }
    })
    const record = await StationControl.config_StationControl(data)
    if (record === '') message.success('Success')
  }

  render() {
    const { form: { getFieldDecorator }, lang: { t } } = this.props
    return (
      <form>
        <Row gutter={16}>
          <Col span={8}>
            <FormItem label={'Station Code'}>
              <InputLabel
                editable={false}
                disabled={this.props.isEdit}
                initialValue={this.props.stationKey}
                placeholder="Station Code"
              />
            </FormItem>
          </Col>
          <Col span={16}>
            <FormItem label={'Station Name'}>
              <InputLabel
                editable={false}
                disabled={this.props.isEdit}
                initialValue={this.props.stationName}
                placeholder="Station Name"
              />
            </FormItem>
          </Col>
        </Row>

        <Row>
          <Col span={24}>
            <FormItem label={'Tag Name'}>
              {getFieldDecorator('tagName')(
                <InputLabel
                  editable={true}
                  disabled={this.props.isEdit}
                  placeholder="Tag Name"
                />
              )}
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <FormItem label={'configTotal'}>
              {getFieldDecorator('total')(
                <InputNumberCell
                  editable={true}
                  disabled={this.props.isEdit}
                  placeholder="configTotal"
                />
              )}
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <FormItem>
              <Button
                style={{ width: '100%' }}
                type="primary"
                htmlType="button"
                onClick={this.handleSubmit}
              >
                SAVE
              </Button>
              <Clearfix />
              <Button
                style={{ width: '100%' }}
                type="primary"
                htmlType="button"
                onClick={this.handleReset}
              >
                RESET
              </Button>
            </FormItem>
          </Col>
        </Row>
      </form>
    )
  }
}
