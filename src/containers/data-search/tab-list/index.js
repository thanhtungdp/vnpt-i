import React from 'react'
import { autobind } from 'core-decorators'
import { Tabs, Button } from 'antd'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import BoxShadow from 'components/elements/box-shadow'
import TabTableDataList from './tab-table-data-list'
import TabChart from './tab-chart'

const TabeListWrapper = BoxShadow.extend`
  padding: 0px 16px 16px 16px;
  position: relative;
`

const ButtonAbsolute = styled.div`
  position: absolute;
  top: 0px;
  right: 16px;
  z-index: 3;
`

@autobind
export default class TabeList extends React.PureComponent {
  static propTypes = {
    isLoading: PropTypes.bool,
    measuringList: PropTypes.array,
    dataStationAuto: PropTypes.array,
    pagination: PropTypes.object,
    onChangePage: PropTypes.func,
    onExportExcel: PropTypes.func
  }

  render() {
    return (
      <TabeListWrapper>
        <ButtonAbsolute>
          <Button
            type="primary"
            icon="file-excel"
            style={{ float: 'right', margin: '5px' }}
            onClick={this.props.onExportExcel}
          >
            Export to excel
          </Button>
        </ButtonAbsolute>
        <Tabs defaultActiveKey="1">
          <Tabs.TabPane tab="Data" key="1">
            <TabTableDataList
              loading={this.props.isLoading}
              measuringList={this.props.measuringList}
              dataSource={this.props.dataStationAuto}
              pagination={this.props.pagination}
              onChange={this.props.onChangePage}
            />
          </Tabs.TabPane>
          <Tabs.TabPane tab="Chart" key="2">
            <TabChart
              dataStationAuto={this.props.dataStationAuto}
              measuringData={this.props.measuringList}
            />
          </Tabs.TabPane>
        </Tabs>
      </TabeListWrapper>
    )
  }
}
