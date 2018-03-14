import React from 'react'
import { Form, Input, Select, Button, Row, Col, Icon, DatePicker } from 'antd'
import PropTypes from 'prop-types'
import { autobind } from 'core-decorators'
import SelectStationType from 'components/elements/select-station-type'
import createLanguageHoc, { langPropTypes } from 'hoc/create-lang'
import StationAutoApi from 'api/StationAuto'
import DataStationAutoApi from 'api/DataStationAutoApi'
import {
  withHighcharts,
  HighchartsStockChart,
  Chart,
  Title,
  Subtitle,
  Legend,
  XAxis,
  YAxis,
  LineSeries
} from 'react-jsx-highstock'
import Highcharts from 'highcharts/highstock'
import moment from 'moment'

const FormItem = Form.Item

@Form.create({})
@createLanguageHoc
@autobind
class DataSearch extends React.PureComponent {
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
    formatDate: 'YYYY-MM-DD HH:mm'
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
    this.setState({ stationAutos: stationAutos.data, fromDate, toDate }, () => {
      const options = stationAutos ? (
        this.state.stationAutos.map(d => (
          <Select.Option key={d.key} value={d.key}>
            {d.name}
          </Select.Option>
        ))
      ) : (
        <Select.Option key={'012'} />
      )
      this.setState({ stationAutoSelects: options || [] })
    })
    if (this.props.initialValues.stationKey) {
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
      var station = this.state.stationAutos.find(
        item => item.key === values.stationAuto
      )
      if (station) {
        data.measuringArray = station.measuringList.map(item => item.key)
      }
      console.log(data)
      this.setState({ dataSearch: data, station: station }, () =>
        this.searchData(data)
      )
    })
  }

  async searchData(query) {
    const dataSource = await DataStationAutoApi.getDataStationAutos(
      { page: 1, itemPerPage: 1000000000000 },
      query
    )
    var lines = []
    var station = this.state.stationAutos.find(item => item.key === query.key)
    var dataLines = {}
    if (station)
      station.measuringList.forEach(function(rec) {
        dataLines[rec.key] = {
          key: rec.key,
          name: rec.name,
          unit: rec.unit,
          data: []
        }
      })
    if (dataSource && dataSource.data) {
      dataSource.data.forEach(function(rec) {
        for (var k in rec.measuringLogs)
          if (dataLines[k]) {
            if (!dataLines[k].data) dataLines[k].data = []
            dataLines[k].data.push([
              new Date(rec.receivedAt).getTime(),
              rec.measuringLogs[k].value
            ])
          }
      })
    }

    for (var item in dataLines) {
      var line = (
        <LineSeries
          id={dataLines[item].key}
          name={dataLines[item].name}
          data={dataLines[item].data}
        />
      )
      lines.push(line)
    }
    this.setState({ lines })
  }

  changeStationType(stationType) {
    const stations = this.state.stationAutos.find(
      item => item.stationType && item.stationType.key === stationType.key
    )
    const options = stations ? (
      this.state.stationAutos.map(d => (
        <Select.Option key={d.key} value={d.key}>
          {d.name}
        </Select.Option>
      ))
    ) : (
      <Select.Option key={'012'} />
    )
    this.setState({ stationAutoSelects: options || [] })
  }

  render() {
    const { getFieldDecorator } = this.props.form
    const { t } = this.props.lang
    return (
      <Form className="ant-advanced-search-form" onSubmit={this.changeSearch}>
        <Row gutter={24}>
          <Col span={5} key="name">
            <SelectStationType
              value={this.props.initialValues.stationType}
              getFieldDecorator={getFieldDecorator}
              label={t('onlineMonitoring.form.stationType.label')}
              onChangeStationType={this.changeStationType}
            />
          </Col>
          <Col span={5} key="stationAuto">
            <FormItem label={t('onlineMonitoring.form.stationAuto.label')}>
              {getFieldDecorator(`stationAuto`, {
                initialValue: this.props.initialValues.stationKey
              })(<Select showSearch>{this.state.stationAutoSelects}</Select>)}
            </FormItem>
          </Col>
          <Col span={4} key="fromDate">
            <FormItem label={t('onlineMonitoring.form.fromDate.label')}>
              {getFieldDecorator(`fromDate`, {
                initialValue: moment(this.state.fromDate, 'DD/MM/YYYY HH:mm')
              })(<DatePicker format={'DD/MM/YYYY HH:mm'} />)}
            </FormItem>
          </Col>
          <Col span={4} key="toDate">
            <FormItem label={t('onlineMonitoring.form.toDate.label')}>
              {getFieldDecorator(`toDate`, {
                initialValue: moment(this.state.toDate, 'DD/MM/YYYY HH:mm')
              })(<DatePicker format={'DD/MM/YYYY HH:mm'} />)}
            </FormItem>
          </Col>
          <Col span={3} style={{ textAlign: 'right', marginTop: '42px' }}>
            <Button type="primary" htmlType="submit">
              <Icon type="search" />
              {t('addon.search')}
            </Button>
          </Col>
        </Row>
        <Row>
          <HighchartsStockChart>
            <Chart />

            <Title>
              {this.state.station.name && this.state.station.name.vi}
            </Title>
            <Legend layout="horizontal" align="center" verticalAlign="bottom" />

            <XAxis>
              <XAxis.Title>Time</XAxis.Title>
            </XAxis>

            <YAxis id="number">{this.state.lines}</YAxis>
          </HighchartsStockChart>
        </Row>
      </Form>
    )
  }
}

export default withHighcharts(DataSearch, Highcharts)
