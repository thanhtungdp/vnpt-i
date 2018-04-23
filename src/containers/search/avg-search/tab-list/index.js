import React from 'react'
import { autobind } from 'core-decorators'
import { Tabs, Button } from 'antd'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import BoxShadow from 'components/elements/box-shadow/index'
import TabTableDataList from './tab-table-data-list/index'
import TabChart from './tab-chart/index'
import ROLE from 'constants/role'
import protectRole from 'hoc/protect-role'

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
    measuringData: PropTypes.array,
    dataStationAuto: PropTypes.array,
    pagination: PropTypes.object,
    onChangePage: PropTypes.func,
    onExportExcel: PropTypes.func,
    nameChart: PropTypes.string,
    isExporting: PropTypes.bool
  }

  render() {
    return (
      <TabeListWrapper>
        <ButtonAbsolute>
          {protectRole(ROLE.AVG_SEARCH.EXPORT)(
            <Button
              type="primary"
              icon="file-excel"
              style={{ float: 'right', margin: '5px' }}
              onClick={this.props.onExportExcel}
              loading={this.props.isExporting}
            >
              Export to excel
            </Button>
          )}
        </ButtonAbsolute>
        <Tabs defaultActiveKey="1">
          <Tabs.TabPane tab="Data" key="1">
            <TabTableDataList
              loading={this.props.isLoading}
              measuringList={this.props.measuringList}
              measuringData={this.props.measuringData}
              dataSource={this.props.dataStationAuto}
              pagination={this.props.pagination}
              onChange={this.props.onChangePage}
            />
          </Tabs.TabPane>
          <Tabs.TabPane tab="Chart" key="2">
            <TabChart
              dataStationAuto={this.props.dataStationAuto}
              measuringData={this.props.measuringData.filter(item =>
                this.props.measuringList.includes(item.key)
              )}
              nameChart={this.props.nameChart}
            />
          </Tabs.TabPane>
        </Tabs>
      </TabeListWrapper>
    )
  }
}
