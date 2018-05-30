import React from 'react'
import { Form as FormStyle, Input, Button, Icon } from 'antd'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { autobind } from 'core-decorators'
import { mapPropsToFields } from 'utils/form'
import SelectStationType from 'components/elements/select-station-camera'
import createLanguageHoc, { langPropTypes } from 'hoc/create-lang'

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
  width: 250px;
  margin-right: 5px;
`

@FormStyle.create({
  mapPropsToFields: mapPropsToFields
})
@createLanguageHoc
@autobind
export default class CameraFilter extends React.PureComponent {
  static propTypes = {
    onSubmit: PropTypes.func,
    initialValues: PropTypes.object,
    onChangeSearch: PropTypes.func,
    lang: langPropTypes
  }

  constructor(props) {
    super(props)
    this.state = {
      station: 'ALL'
    }
  }

  async componentWillMount() {
    if (this.props.initialValues.stationKey)
      this.setState(
        {
          station: this.props.initialValues.stationKey
        },
        () => {
          this.props.onChangeSearch(this.state)
        }
      )
  }

  changeStation(station) {
    this.setState(
      {
        station: station
      },
      () => {
        let data = {}
        if (this.state.station) data.station = this.state.station
        // Callback submit form Container Component
        this.setState({ dataSearch: data }, () =>
          this.props.onChangeSearch(data)
        )
      }
    )
  }

  render() {
    const { getFieldDecorator } = this.props.form
    const { t } = this.props.lang
    return (
      <Form className="fadeIn animated" onSubmit={this.changeSearch}>
        <SelectWrapper>
          <SelectStationType
            classNane="select-form-auto"
            getFieldDecorator={getFieldDecorator}
            onChange={this.changeStation}
            value={this.state.station}
            placeholder={t('cameraControl.selectStationPlaceholder')}
          />
        </SelectWrapper>
        {/* <Button shape="circle" htmlType="submit">
          <Icon type="search" />
        </Button> */}
      </Form>
    )
  }
}
