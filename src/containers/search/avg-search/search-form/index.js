import React from 'react'
import { autobind } from 'core-decorators'
import styled from 'styled-components'
import { connect } from 'react-redux'
import { reduxForm, Field } from 'redux-form'
import { Row, Col, Button } from 'antd'
import DatePicker from 'components/elements/datetime-picker/index'
import createLang from 'hoc/create-lang/index'
import SelectStationType from 'components/elements/select-station-type/index'
import SelectAnt from 'components/elements/select-ant/index'
import Clearfix from 'components/elements/clearfix/index'
import createValidateComponent from 'components/elements/redux-form-validate/index'
import moment from 'moment'
import { default as BoxShadowStyle } from 'components/elements/box-shadow/index'
import Heading from 'components/elements/heading/index'
import SelectStationAuto from '../../common/select-station-auto'
import SelectTimeRange from '../../common/select-time-range'
import { translate } from 'hoc/create-lang'

const FSelectStationType = createValidateComponent(SelectStationType)
const FSelectStationAuto = createValidateComponent(SelectStationAuto)
const FSelectTimeRange = createValidateComponent(SelectTimeRange)
const FDatePicker = createValidateComponent(DatePicker)
const FSelectAnt = createValidateComponent(SelectAnt)

const DATE_FORMAT = 'DD/MM/YYYY HH:mm'

const SearchFormContainer = BoxShadowStyle.extend``
const Container = styled.div`
  padding: 16px 16px;
`

function validate(values) {
  const errors = {}
  if (!values.stationType)
    errors.stationType = translate('avgSearchFrom.form.stationType.error')
  if (!values.stationAuto || values.stationAuto === '')
    errors.stationAuto = translate('avgSearchFrom.form.stationAuto.error')
  if (!values.type) errors.type = translate('avgSearchFrom.form.type.error')
  if (values.measuringList && values.measuringList.length === 0)
    errors.measuringList = translate('avgSearchFrom.form.measuringList.require')

  return errors
}

@connect(state => ({
  initialValues: {
    fromDate: moment(new Date().setMonth(new Date().getMonth() - 1)),
    toDate: moment()
  }
}))
@reduxForm({
  form: 'avgSearchForm',
  validate
})
@createLang
@autobind
export default class SearchAvgForm extends React.Component {
  state = {
    stationTypeKey: '',
    stationAutoKey: '',
    measuringData: [],
    measuringList: []
  }

  handleChangeStationType(stationTypeKey, e) {
    this.setState({
      stationTypeKey: stationTypeKey ? stationTypeKey.key : '',
      stationAutoKey: ''
    })
    this.props.change('stationAuto', '')
  }

  handleChangeStationAuto(stationAuto) {
    const measuringData = stationAuto.measuringList.sort(function(a, b) {
      return a.numericalOrder - b.numericalOrder
    })
    this.setState({
      measuringList: measuringData.map(measuring => ({
        value: measuring.key,
        name: measuring.name
      })),
      measuringData: measuringData,
      stationAutoKey: stationAuto.key,
      stationAutoName: stationAuto.name
    })

    this.props.change('measuringList', measuringData.map(m => m.key))
  }

  convertDateToString(date) {
    return moment(date, 'YYYY-MM-DD HH:mm').toISOString()
  }

  handleSubmit(values) {
    this.props.onSubmit({
      fromDate: this.convertDateToString(values.fromDate),
      toDate: this.convertDateToString(values.toDate),
      key: values.stationAuto,
      name: this.state.stationAutoName,
      type: values.type,
      measuringList: values.measuringList,
      measuringData: this.state.measuringData
    })
  }

  render() {
    const t = this.props.lang.createNameSpace('avgSearchFrom.form')
    return (
      <SearchFormContainer>
        <Heading
          rightChildren={
            <Button
              type="primary"
              icon="search"
              size="small"
              onClick={this.props.handleSubmit(this.handleSubmit)}
            >
              {this.props.lang.t('addon.search')}
            </Button>
          }
          textColor="#ffffff"
          isBackground
          fontSize={14}
          style={{ padding: '8px 16px' }}
        >
          {this.props.lang.t('addon.search')}
        </Heading>
        <Container>
          <Row gutter={16}>
            <Col span={8}>
              <Field
                label={t('stationType.label')}
                name="stationType"
                size="large"
                onHandleChange={this.handleChangeStationType}
                component={FSelectStationType}
              />
            </Col>
            <Col span={8}>
              <Field
                label={t('stationAuto.label')}
                name="stationAuto"
                size="large"
                stationTypeKey={this.state.stationTypeKey}
                component={FSelectStationAuto}
                stationAutoKey={this.state.stationAutoKey}
                setKey
                onChangeObject={this.handleChangeStationAuto}
              />
            </Col>
            <Col span={8}>
              <Field
                label={t('type.label')}
                name="type"
                size="large"
                component={FSelectTimeRange}
              />
            </Col>
          </Row>
          <Clearfix height={16} />
          <Row gutter={24}>
            <Col span={8}>
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
            <Col span={8}>
              <Field
                label={t('fromDate.label')}
                name="fromDate"
                size="large"
                component={FDatePicker}
                dateFormat={DATE_FORMAT}
              />
            </Col>
            <Col span={8}>
              <Field
                label={t('toDate.label')}
                name="toDate"
                size="large"
                component={FDatePicker}
                dateFormat={DATE_FORMAT}
              />
            </Col>
          </Row>
        </Container>
      </SearchFormContainer>
    )
  }
}
