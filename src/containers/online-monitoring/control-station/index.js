import React from 'react'
import { Form, Input, Button, Row, Col } from 'antd'
import PropTypes from 'prop-types'
import { autobind } from 'core-decorators'
import { mapPropsToFields } from 'utils/form'
import createLanguage, { langPropTypes } from 'hoc/create-lang'
import Clearfix from 'components/elements/clearfix'
import styled from 'styled-components'

const FormItem = Form.Item

const FlexStyle = styled.div`
  display: flex;
`

@Form.create({
  mapPropsToFields: mapPropsToFields
})
@createLanguage
@autobind
export default class ControlStation extends React.PureComponent {
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
        <Form  onSubmit={this.handleSubmit}>
          <Row gutter={16}>
            <Col span={6}>
              <FormItem label={'Tổng số chai'}>
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
                    placeholder='Tổng số chai'
                  />
                )}
              </FormItem>
            </Col>
            <Col span={6}>
              <FormItem label={'Tổng số chai đã lấy'}>
                {getFieldDecorator('name', {
                  rules: [
                    {
                      required: true,
                      message: t('measuringManager.form.name.error')
                    }
                  ]
                })(
                  <Input
                    placeholder={'Tổng số chai đã lấy'}
                  />
                )}
              </FormItem>
            </Col>
          </Row>
          <FormItem>
            <Button style={{ width: '50%' }} type="primary" htmlType="submit">
              KÍCH HOẠT
            </Button>
            <Clearfix/>
            <Button style={{ width: '50%' }} type="primary" htmlType="submit">
              KÍCH HOẠT LẤY MẪU VƯỢT NGƯỠNG
            </Button>
          </FormItem>
        </Form>
    )
  }
}
