import React from 'react'
import { Form as FormStyle, Input, Button, Row, Col, Icon } from 'antd'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { autobind } from 'core-decorators'
import { mapPropsToFields } from 'utils/form'
import SelectStationType from 'components/elements/select-station-type'
import createLanguageHoc, { langPropTypes } from '../../../../hoc/create-lang'

const FormItem = FormStyle.Item

const Form = styled(FormStyle)`
  display: flex;
  .ant-form-item-control {
    line-height: 0px;
  }
  .ant-form-item {
    margin-bottom: 0px;
  }
  .flex-grow {
    flex-grow: 1;
  }
`

const Clearfix = styled.div`
  width: 8px;
`

const SelectWrapper = styled.div`
  width: 140px;
  margin-right:5px;
`

@FormStyle.create({
  mapPropsToFields: mapPropsToFields
})
@createLanguageHoc
@autobind
export default class StationAutoSearchForm extends React.PureComponent {
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
      if (values.address) data.address = values.address
      if (values.name) data.name = values.name
      if (values.stationType) data.stationType = values.stationType
      // Callback submit form Container Component
      this.setState({ dataSearch: data }, () => this.props.onChangeSearch(data))
    })
  }

  changeStationType(stationType) {}

  render() {
    const { getFieldDecorator } = this.props.form
    const { t } = this.props.lang
    return (
      <Form className="fadeIn animated" onSubmit={this.changeSearch}>
        <FormItem>
          {getFieldDecorator(`name`)(
            <Input
              placeholder={t('stationAutoManager.form.name.label')}
            />
          )}
        </FormItem>
        <Clearfix />
        <FormItem>
          {getFieldDecorator(`address`)(
            <Input
              placeholder={t('stationAutoManager.form.address.placeholder')}
            />
          )}
        </FormItem>
        <Clearfix />
        <SelectWrapper>
          <SelectStationType
            classNane="select-form-auto"
            getFieldDecorator={getFieldDecorator}
            onChangeStationType={this.changeStationType}
            placeholder={t('stationAutoManager.form.stationType.placeholder')}
          />
        </SelectWrapper>
        <Button shape="circle" htmlType="submit">
          <Icon type="search" />
        </Button>
      </Form>
    )
  }
}
