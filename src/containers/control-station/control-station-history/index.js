import React, { PureComponent } from 'react'
import { Table } from 'antd'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'
import Breadcrumb from 'containers/control-station/breadcrumb'
import PageContainer from 'layout/default-sidebar-layout/PageContainer'
import moment from 'moment'
import slug from 'constants/slug'
import { autobind } from 'core-decorators'
import StationControl from 'api/StationControl'

const columns = [
  {
    title: 'Order By Bottle',
    dataIndex: 'LayMauChai',
    width: 150,
    fixed: 'left'
  },
  {
    title: 'DateTime',
    dataIndex: 'ThoiGian',
    width: 150
  },
  {
    title: 'Content',
    dataIndex: 'NoiDung'
  },
  {
    title: 'Email',
    dataIndex: 'Email'
  }
]

@withRouter
@autobind
export default class ControlStationHistory extends PureComponent {
  static propTypes = {}

  state = {
    isLoaded: false,
    dataHistory: []
  }
  async componentDidMount() {
    this.setState({ isLoaded: false })
    const name = this.props.match.params.name
    const key = this.props.match.params.key
    const record = await StationControl.getHistory_StationControl(key)
    console.log(record)
    if (record.success) {
      record.data = record.data.map(item => ({
        ...item,
        ThoiGian: item.ThoiGian
          ? moment(item.ThoiGian).format('DD/MM/YYYY HH:mm:ss')
          : ''
      }))

      console.log(record)
      this.setState(
        {
          isLoaded: true,
          dataHistory: record.data
        },
        () => {
          console.log(record.data)
        }
      )
    }
  }

  render() {
    return (
      <PageContainer>
        <Breadcrumb
          items={[
            {
              key: 'trigger',
              custom: {
                href:
                  slug.controlStation.triggerWithKey +
                  `/${this.props.match.params.key}/${
                    this.props.match.params.name
                  }`
              }
            },
            {
              key: 'history',
              custom: {
                href:
                  slug.controlStation.triggerWithKey +
                  `/${this.props.match.params.key}/${
                    this.props.match.params.name
                  }`
              }
            },
            {
              id: 'info',
              name: `${this.props.match.params.name}`
            }
          ]}
        />
        {this.state.isLoaded && (
          <div style={{ width: '100%', display: 'block' }}>
            <Table
              columns={columns}
              dataSource={this.state.dataHistory}
              bordered
              size={'small'}
            />
          </div>
        )}
      </PageContainer>
    )
  }
}
