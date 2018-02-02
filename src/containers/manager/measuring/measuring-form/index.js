import React from 'react'
import { Form, Input, Button, Row, Col } from 'antd'
import PropTypes from 'prop-types'
import { autobind } from 'core-decorators'
import { mapPropsToFields } from 'utils/form'
import createLanguage, { langPropTypes } from 'hoc/create-lang'

const FormItem = Form.Item

@Form.create({
  mapPropsToFields: mapPropsToFields
})
@createLanguage
@autobind
export default class MeasuringForm extends React.PureComponent {
  static propTypes = {
    onSubmit: PropTypes.func,
    lang: langPropTypes,
    isEdit: PropTypes.bool
  }

  handleSubmit(e) {
    e.preventDefault()
    this.props.form.validateFields((err, values) => {
      if (err) return
      const data = {
        key: values.key,
        name: values.name,
        unit: values.unit ? values.unit : ''
      }
      // Callback submit form Container Component
      this.props.onSubmit(data)
    })
  }

  render() {
    const { form: { getFieldDecorator }, lang: { t } } = this.props
    return (
      <Form onSubmit={this.handleSubmit}>
        <Row gutter={16}>
          <Col span={12}>
            <FormItem label={t('measuringManager.form.key.label')}>
              {getFieldDecorator('key', {
                rules: [
                  {
                    required: true,
                    message: t('measuringManager.form.key.error')
                  }
                ]
              })(
                <Input
                  disabled={this.props.isEdit}
                  placeholder={t('measuringManager.form.key.placeholder')}
                />
              )}
            </FormItem>
          </Col>
          <Col span={12}>
            <FormItem label={t('measuringManager.form.name.label')}>
              {getFieldDecorator('name', {
                rules: [
                  {
                    required: true,
                    message: t('measuringManager.form.name.error')
                  }
                ]
              })(
                <Input
                  placeholder={t('measuringManager.form.name.placeholder')}
                />
              )}
            </FormItem>
          </Col>
        </Row>

        <FormItem label={t('measuringManager.form.unit.label')}>
          {getFieldDecorator('unit')(
            <Input placeholder={t('measuringManager.form.unit.placeholder')} />
          )}
        </FormItem>
        <FormItem>
          <Button style={{ width: '100%' }} type="primary" htmlType="submit">
            Save
          </Button>
        </FormItem>
      </Form>
    )
  }
}
