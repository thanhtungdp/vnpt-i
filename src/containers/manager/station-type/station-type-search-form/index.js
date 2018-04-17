import React from 'react'
import { Form as FormStyle, Input, Button, Icon } from 'antd'
import PropTypes from 'prop-types'
import { autobind } from 'core-decorators'
import { mapPropsToFields } from 'utils/form'
import createLanguage, { langPropTypes } from 'hoc/create-lang'
import styled from 'styled-components'

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
export default class StationTypeSearchForm extends React.PureComponent {
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
      if (values.key) data.key = values.key
      if (values.name) data.name = values.name
      // Callback submit form Container Component
      this.setState({ dataSearch: data }, () => this.props.onChangeSearch(data))
    })
  }

  render() {
    const { getFieldDecorator } = this.props.form
    const { lang: { t } } = this.props
    return (
      <Form className="fadeIn animated" onSubmit={this.changeSearch}>
        <FormItem>
          {getFieldDecorator(`key`)(
            <Input placeholder={t('stationTypeManager.form.key.label')} />
          )}
        </FormItem>
        <Clearfix />
        <FormItem>
          {getFieldDecorator(`name`)(
            <Input placeholder={t('stationTypeManager.form.name.label')} />
          )}
        </FormItem>
        <Clearfix />
        <Button shape="circle" htmlType="submit">
          <Icon type="search" />
        </Button>
      </Form>
    )
  }
}
