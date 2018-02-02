import React from 'react'
import { Form, Input, Button, Row, Col, Checkbox, Upload, Icon } from 'antd'
import PropTypes from 'prop-types'
import { autobind } from 'core-decorators'
import { mapPropsToFields } from 'utils/form'
import { STATION_TYPE_API } from 'config'
import createLanguageHoc, { langPropTypes } from '../../../../hoc/create-lang'

const FormItem = Form.Item

const urlUpdate = STATION_TYPE_API + '/station-type/upload'

@Form.create({
  mapPropsToFields: mapPropsToFields
})
@createLanguageHoc
@autobind
export default class StationTypeForm extends React.PureComponent {
  static propTypes = {
    onSubmit: PropTypes.func,
    lang: langPropTypes
  }

  handleSubmit(e) {
    e.preventDefault()
    this.props.form.validateFields((err, values) => {
      if (err) return
      const data = {
        key: values.key,
        name: values.name,
        isAuto: values.isAuto,
        icon: values.icon,
        files: {}
      }
      data.icon =
        values.file && values.file.length > 0
          ? values.file[0].response.file
          : values.icon
      // Callback submit form Container Component
      this.props.onSubmit(data)
    })
  }

  normFile(e) {
    console.log('Upload event:', e)
    if (Array.isArray(e)) {
      return e
    }
    return e && e.fileList
  }

  render() {
    const { getFieldDecorator } = this.props.form
    const { t } = this.props.lang
    return (
      <Form onSubmit={this.handleSubmit}>
        <Row gutter={16}>
          <Col span={12}>
            <FormItem label={t('stationTypeManager.form.key.label')}>
              {getFieldDecorator('key', {
                rules: [
                  {
                    required: true,
                    message: t('stationTypeManage.form.key.error')
                  }
                ]
              })(
                <Input placeholder={t('stationTypeManager.form.key.label')} />
              )}
            </FormItem>
          </Col>
          <Col span={12}>
            <FormItem label={t('stationTypeManager.form.name.label')}>
              {getFieldDecorator('name', {
                rules: [
                  {
                    required: true,
                    message: t('stationTypeManage.form.name.error')
                  }
                ]
              })(
                <Input placeholder={t('stationTypeManager.form.name.label')} />
              )}
            </FormItem>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={12}>
            <FormItem label={t('stationTypeManager.form.icon.label')}>
              <div className="dropbox">
                {getFieldDecorator('file', {
                  valuePropName: 'file',
                  getValueFromEvent: this.normFile
                })(
                  <Upload
                    action={urlUpdate}
                    listType={'picture'}
                    defaultFileList={[]}
                  >
                    <Button>
                      <Icon type="upload" /> upload
                    </Button>
                  </Upload>
                )}
              </div>
            </FormItem>
          </Col>
          <Col span={12}>
            <FormItem label={t('stationTypeManager.form.auto.label')}>
              {getFieldDecorator('isAuto')(<Checkbox />)}
            </FormItem>
          </Col>
        </Row>
        {getFieldDecorator('icon')(<Input type={'hidden'} />)}
        <FormItem>
          <Button style={{ width: '100%' }} type="primary" htmlType="submit">
            Save
          </Button>
        </FormItem>
      </Form>
    )
  }
}
