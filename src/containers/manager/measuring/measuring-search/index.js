import React from 'react'
import { Form as FormStyle, Input, Button, Icon } from 'antd'
import PropTypes from 'prop-types'
import { autobind } from 'core-decorators'
import { mapPropsToFields } from 'utils/form'
import styled from 'styled-components'
import createLanguage, { langPropTypes } from 'hoc/create-lang'

const FormItem = FormStyle.Item
const Form = styled(FormStyle)`
  display: flex;
  .ant-form-item-control {
    line-height: 0px;
  }
  .ant-form-item {
    margin-bottom: 0px;
  }
`
const Clearfix = styled.div`
  width: 8px;
`

@FormStyle.create({
  mapPropsToFields: mapPropsToFields
})
@createLanguage
@autobind
export default class MeasuringSearchForm extends React.PureComponent {
  static propTypes = {
    onSubmit: PropTypes.func,
    initialValues: PropTypes.object,
    onChangeSearch: PropTypes.func,
    lang: langPropTypes
  }

  constructor(props) {
    super(props)
    this.state = {}
  }

  async componentWillMount() {}
  changeSearch(e) {
    e.preventDefault()
    this.props.form.validateFields((err, values) => {
      if (err) return
      const data = {}
      if (values.unit) data.unit = values.unit
      if (values.name) data.name = values.name
      // Callback submit form Container Component
      this.setState({ dataSearch: data }, () => this.props.onChangeSearch(data))
    })
  }

  render() {
    const { getFieldDecorator } = this.props.form
    const { lang: { t } } = this.props
    if (this.props.isAdvanced) {
      return null
    }
    return (
      <Form className="fadeIn animated" onSubmit={this.changeSearch}>
        <FormItem>
          {getFieldDecorator(`name`)(
            <Input placeholder={t('measuringManager.form.name.label')} />
          )}
        </FormItem>
        <Clearfix />
        <FormItem>
          {getFieldDecorator(`unit`)(
            <Input placeholder={t('measuringManager.form.unit.label')} />
          )}
        </FormItem>
        <Clearfix />
        <Button shape="circle" htmlType="submit">
          <Icon type="search" />
        </Button>
        &nbsp;
        <Button
          onClick={this.props.onAdvanced}
          shape="circle"
          htmlType="button"
        >
          <Icon type="arrows-alt" />
        </Button>
      </Form>
    )
  }
}
