import React from 'react'
import { autobind } from 'core-decorators'
import styled from 'styled-components'
import { connect } from 'react-redux'
import { reduxForm, Field } from 'redux-form'
import { Row, Col, Checkbox, Switch } from 'antd'
import DatePicker from 'components/elements/datetime-picker'
import createLang from 'hoc/create-lang'
import SelectStationType from 'components/elements/select-station-type'
import SelectAnt from 'components/elements/select-ant'
import Clearfix from 'components/elements/clearfix'
import SelectStationAuto from './SelectStationAuto'
import createValidateComponent from 'components/elements/redux-form-validate'
import moment from 'moment'

const FSelectStationType = createValidateComponent(SelectStationType)
const FSelectStationAuto = createValidateComponent(SelectStationAuto)
const FDatePicker = createValidateComponent(DatePicker)
const FCheckbox = createValidateComponent(Switch)
const FSelectAnt = createValidateComponent(SelectAnt)

const SearchFormWrapper = styled.form``
const DATE_FORMAT = 'DD/MM/YYYY HH:mm'

@connect(state => ({
  initialValues: {
    fromDate: moment(new Date().setMonth(new Date().getMonth() - 1)),
    toDate: moment()
  }
}))
@reduxForm({
  form: 'searchForm'
})
@createLang
@autobind
export default class SearchForm extends React.PureComponent {
  state = {
    stationTypeKey: '',
    measuringList: []
  }

  handleChangeStationType(e, stationTypeKey) {
    this.setState({ stationTypeKey })
  }

  handleChangeStationAuto(stationAuto) {
    const measuringList = stationAuto.measuringList.map(measuring => ({
      value: measuring.key,
      name: measuring.name
    }))
    this.setState({
      measuringList
    })
    this.props.change('measuringList', measuringList.map(m => m.value))
  }

  render() {
    const t = this.props.lang.createNameSpace('dataSearchFrom.form')
    return (
      <SearchFormWrapper>
        <Row gutter={16}>
          <Col span={6}>
            <Field
              label={t('stationType.label')}
              name="stationType"
              size="large"
              onChange={this.handleChangeStationType}
              component={FSelectStationType}
            />
          </Col>
          <Col span={6}>
            <Field
              label={t('stationAuto.label')}
              name="stationAuto"
              size="large"
              stationTypeKey={this.state.stationTypeKey}
              component={FSelectStationAuto}
              onChangeObject={this.handleChangeStationAuto}
            />
          </Col>
          <Col span={6}>
            <Field
              label={t('fromDate.label')}
              name="fromDate"
              size="large"
              component={FDatePicker}
              dateFormat={DATE_FORMAT}
            />
          </Col>
          <Col span={6}>
            <Field
              label={t('toDate.label')}
              name="toDate"
              size="large"
              component={FDatePicker}
              dateFormat={DATE_FORMAT}
            />
          </Col>
        </Row>
        <Clearfix height={16} />
        <Row gutter={24}>
          <Col span={12}>
            <Field
              label={t('measuringList.label')}
              name="measuringList"
              size="large"
              showSearch
              mode="multiple"
              options={this.state.measuringList}
              component={FSelectAnt}
            />
          </Col>
          <Col span={6}>
            <Field
              label={t('isExceeded.label')}
              name="isExceeded"
              size="large"
              component={FCheckbox}
            />
          </Col>
        </Row>
      </SearchFormWrapper>
    )
  }
}
