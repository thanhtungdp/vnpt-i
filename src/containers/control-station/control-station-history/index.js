import React, { PureComponent } from 'react'
import { Table } from 'antd'
import { withRouter } from 'react-router-dom'
import Breadcrumb from 'containers/control-station/breadcrumb'
import PageContainer from 'layout/default-sidebar-layout/PageContainer'
import moment from 'moment'
import slug from 'constants/slug'
import { autobind } from 'core-decorators'
import StationControl from 'api/StationControl'
import { translate } from 'hoc/create-lang'
import { connect } from 'react-redux'

@connect(state => ({
  organization: state.auth.userInfo.organization
}))
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
    const key = this.props.match.params.key
    const record = await StationControl.getHistory_StationControl(key, this.props.organization._id)
    if (record.success) {
      record.data = record.data.map(item => ({
        ...item,
        ThoiGian: item.ThoiGian
          ? moment(item.ThoiGian).format('YYYY/MM/DD HH:mm:ss')
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
    const columns = [
      {
        title: translate('controlStation.orderByBottle'),
        dataIndex: 'LayMauChai',
        width: 150,
        fixed: 'left',
        render: function (data, type, row, meta) {
          return translate('controlStation.bottle') + ' ' + data
        }
      },
      {
        title: translate('controlStation.dateTime'),
        dataIndex: 'ThoiGian',
        width: 250
      },
      {
        title: translate('controlStation.content'),
        dataIndex: 'NoiDung',
        render: function (data, type, row, meta) {
          if (data === 'HANDMADE') {
            return translate('controlStation.handMade')
          } else if (data === 'AUTOMATIC') {
            return translate('controlStation.automatic')
          }
        }
      },
      {
        title: translate('controlStation.email'),
        dataIndex: 'Email'
      }
    ]
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
              pagination={false}
            />
          </div>
        )}
      </PageContainer>
    )
  }
}
