import React from 'react'
import { autobind } from 'core-decorators'
import styled from 'styled-components'
import { connect } from 'react-redux'
import { reduxForm, Field } from 'redux-form'
import { Row, Col, Button, Switch } from 'antd'
import DatePicker from 'components/elements/datetime-picker'
import createLang from 'hoc/create-lang'
import SelectStationType from 'components/elements/select-station-type'
import SelectAnt from 'components/elements/select-ant'
import Clearfix from 'components/elements/clearfix'
import SelectStationAuto from './SelectStationAuto'
import createValidateComponent from 'components/elements/redux-form-validate'
import moment from 'moment'
import { default as BoxShadowStyle } from 'components/elements/box-shadow'
import Heading from 'components/elements/heading'

const FSelectStationType = createValidateComponent(SelectStationType)
const FSelectStationAuto = createValidateComponent(SelectStationAuto)
const FDatePicker = createValidateComponent(DatePicker)
const FSwitch = createValidateComponent(Switch)
const FSelectAnt = createValidateComponent(SelectAnt)

const DATE_FORMAT = 'DD/MM/YYYY HH:mm'

const SearchFormContainer = BoxShadowStyle.extend``
const Container = styled.div`
  padding: 16px 16px;
`

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
export default class SearchForm extends React.Component {
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

  convertDateToString(date) {
    return moment(date, 'YYYY-MM-DD HH:mm').toISOString()
  }

  handleSubmit(values) {
    this.props.onSubmit({
      fromDate: this.convertDateToString(values.fromDate),
      toDate: this.convertDateToString(values.toDate),
      key: values.stationAuto,
      measuringList: values.measuringList,
      measuringData: this.state.measuringList,
      isExceeded: values.isExceeded,
      advanced: []
    })
    console.log(values)
  }

  render() {
    const t = this.props.lang.createNameSpace('dataSearchFrom.form')
    return (
      <SearchFormContainer>
        <Heading
          rightChildren={
            <Button
              type="primary"
              icon="search"
              onClick={this.props.handleSubmit(this.handleSubmit)}
            >
              {this.props.lang.t('addon.search')}
            </Button>
          }
          textColor="#ffffff"
          isBackground
          style={{ padding: '8px 16px' }}
        >
          {this.props.lang.t('addon.search')}
        </Heading>
        <Container>
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
                component={FSwitch}
              />
            </Col>
          </Row>
        </Container>
      </SearchFormContainer>
    )
  }
}
