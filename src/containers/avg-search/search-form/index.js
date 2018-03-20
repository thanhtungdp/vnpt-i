import React from 'react'
import {
  Form,
  Checkbox,
  Select,
  Button,
  Row,
  Col,
  Icon,
  DatePicker,
  Collapse,
  InputNumber
} from 'antd'
import PropTypes from 'prop-types'
import { autobind } from 'core-decorators'
import SelectStationType from 'components/elements/select-station-type'
import createLanguageHoc, { langPropTypes } from 'hoc/create-lang'
import StationAutoApi from 'api/StationAuto'
import moment from 'moment'

const FormItem = Form.Item

@Form.create({})
@createLanguageHoc
@autobind
export default class SearchFrom extends React.PureComponent {
  static propTypes = {
    onSubmit: PropTypes.func,
    initialValues: PropTypes.object,
    onChangeSearch: PropTypes.func,
    lang: langPropTypes
  }

  state = {
    stationAutos: [],
    stationAutoSelects: [],
    lines: [],
    station: {},
    fromDate: '',
    toDate: '',
    formatDate: 'YYYY-MM-DD HH:mm',
    measuringSelected: [],
    measuringList: []
  }

  constructor(props) {
    super(props)
  }

  async componentWillMount() {
    const stationAutos = await StationAutoApi.getStationAutos(
      { page: 1, itemPerPage: 10000000 },
      {}
    )
    var toDate = new Date()
    var fromDate = new Date()
    fromDate.setMonth(fromDate.getMonth() - 1)

    let options = stationAutos.data
    this.setState({
      stationAutos: stationAutos.data,
      fromDate,
      toDate,
      stationAutoSelects: options || []
    })

    if (this.props.initialValues.stationAuto) {
      this.changeSearch({})
    }
  }

  changeSearch(e) {
    if (e.preventDefault) e.preventDefault()
    this.props.form.validateFields((err, values) => {
      if (err) return
      const data = {}
      if (values.fromDate)
        data.fromDate = moment(
          values.fromDate,
          this.state.formatDate
        ).toISOString()
      if (values.toDate)
        data.toDate = moment(values.toDate, this.state.formatDate).toISOString()
      if (values.stationAuto) data.key = values.stationAuto
      if (values.type) data.type = values.type
      var station = this.state.stationAutos.find(
        item => item.key === values.stationAuto
      )
      if (values.measuringList) data.measuringArray = values.measuringList
      var measuringList = this.state.measuringList.filter(
        item => values.measuringList.indexOf(item.key) > -1
      )
      if (measuringList) data.measuringList = measuringList
      this.setState({ dataSearch: data, station: station }, () =>
        this.props.onChangeSearch(data)
      )
    })
  }

  changeStationType(stationType) {
    let stations = this.state.stationAutos.filter(station => {
      return station.stationType && station.stationType.key === stationType.key
    })

    this.setState({ stationAutoSelects: stations, station: {} }, () => {
      this.props.form.setFields({
        stationAuto: {
          value: ''
        }
      })
    })
  }

  changeStationAuto(value) {
    this.props.form.setFields({
      measuringList: {
        error: null
      }
    })

    var stations = this.state.stationAutos.find(item => item.key === value)
    var measuringList = stations.measuringList
    if (!Array.isArray(measuringList)) {
      measuringList = [measuringList]
    }
    const options = measuringList ? (
      measuringList.map(d => (
        <Select.Option key={d.key} value={d.key}>
          {d.name}
        </Select.Option>
      ))
    ) : (
      <Select.Option />
    )
    var measuringSelected = []
    measuringList.forEach(function(rec) {
      measuringSelected.push(rec.key)
    })
    this.setState({
      measuringOps: options || [],
      measuringSelected: measuringSelected,
      measuringList: measuringList
    })
  }

  render() {
    const { getFieldDecorator } = this.props.form
    const { t } = this.props.lang
    return (
      <Row>
        <Form onSubmit={this.changeSearch}>
          <Row gutter={24}>
            <Col span={8} key="name">
              <SelectStationType
                value={this.props.initialValues.stationType}
                getFieldDecorator={getFieldDecorator}
                label={t('avgSearchFrom.form.stationType.label')}
                onChangeStationType={this.changeStationType}
              />
            </Col>
            <Col span={8} key="stationAuto">
              <FormItem label={t('avgSearchFrom.form.stationAuto.label')}>
                {getFieldDecorator(`stationAuto`, {
                  initialValue: this.props.initialValues.stationAuto,
                  rules: [
                    {
                      required: true,
                      message:
                        'Please input ' +
                        t('avgSearchFrom.form.stationAuto.label')
                    }
                  ]
                })(
                  <Select showSearch onChange={this.changeStationAuto}>
                    {this.state.stationAutoSelects &&
                      this.state.stationAutoSelects.map(item => {
                        return (
                          <Select.Option key={item.key} value={item.key}>
                            {item.name}
                          </Select.Option>
                        )
                      })}
                  </Select>
                )}
              </FormItem>
            </Col>
            <Col span={8} key="type">
              <FormItem label={t('avgSearchFrom.form.type.label')}>
                {getFieldDecorator(`type`, {
                  initialValue: this.props.initialValues.type,
                  rules: [
                    {
                      required: true,
                      message:
                        'Please input ' + t('avgSearchFrom.form.type.label')
                    }
                  ]
                })(
                  <Select showSearch>
                    <Select.Option value={15}>15 Minues</Select.Option>
                    <Select.Option value={30}>30 Minues</Select.Option>
                    <Select.Option value={60}>Hour</Select.Option>
                    <Select.Option value={24 * 60}>Day</Select.Option>
                    <Select.Option value={'month'}>Month</Select.Option>
                  </Select>
                )}
              </FormItem>
            </Col>
          </Row>
          <Row gutter={24}>
            <Col span={8} key="measuringList">
              <FormItem label={t('avgSearchFrom.form.measuringList.label')}>
                {getFieldDecorator(`measuringList`, {
                  initialValue: this.state.measuringSelected,
                  rules: [
                    {
                      required: true,
                      message: t('avgSearchFrom.form.measuringList.require')
                    }
                  ]
                })(
                  <Select
                    showSearch
                    mode="multiple"
                    value={this.state.measuringSelected}
                  >
                    {this.state.measuringOps}
                  </Select>
                )}
              </FormItem>
            </Col>
            <Col span={8} key="fromDate">
              <FormItem label={t('avgSearchFrom.form.fromDate.label')}>
                {getFieldDecorator(`fromDate`, {
                  initialValue: moment(this.state.fromDate, 'DD/MM/YYYY HH:mm'),
                  rules: [
                    {
                      required: true,
                      message:
                        'Please input ' + t('avgSearchFrom.form.fromDate.label')
                    }
                  ]
                })(<DatePicker format={'DD/MM/YYYY HH:mm'} />)}
              </FormItem>
            </Col>
            <Col span={8} key="toDate">
              <FormItem label={t('avgSearchFrom.form.toDate.label')}>
                {getFieldDecorator(`toDate`, {
                  initialValue: moment(this.state.toDate, 'DD/MM/YYYY HH:mm'),
                  rules: [
                    {
                      required: true,
                      message:
                        'Please input ' + t('avgSearchFrom.form.toDate.label')
                    }
                  ]
                })(<DatePicker format={'DD/MM/YYYY HH:mm'} />)}
              </FormItem>
            </Col>
          </Row>
          <Row gutter={24}>
            <Col span={2} style={{ float: 'right' }}>
              <Button
                type="primary"
                style={{ float: 'right' }}
                htmlType="submit"
              >
                <Icon type="search" />
                {t('addon.search')}
              </Button>
            </Col>
          </Row>
        </Form>
      </Row>
    )
  }
}
