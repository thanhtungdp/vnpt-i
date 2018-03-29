import React from 'react'
import { autobind } from 'core-decorators'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Collapse } from 'reactstrap'
import { Icon } from 'antd'

const StationGroupItemWrapper = styled.div``

const GroupLabel = styled.div`
  background-color: #efefef;
  color: #42516e;
  padding: 8px 8px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-weight: 600;
  &:hover {
    cursor: pointer;
  }
`

const StationList = styled.div``

const StationItem = styled.div`
  padding: 8px 12px;
  border-bottom: 1px solid #eeeeee;
  &:hover {
    background-color: #fafbfb;
    cursor: pointer;
  }
  ${props => props.isActive ? `
    background-color: #FAFBFB;
    color: #007EE5;
  ` : ``}
`

@autobind
export default class StationGroupItem extends React.PureComponent {
  static propTypes = {
    stationType: PropTypes.string,
    stationSelected: PropTypes.string,
    stations: PropTypes.arrayOf(
      PropTypes.shape({
        key: PropTypes.string,
        name: PropTypes.string
      })
    ),
    onSelectStation: PropTypes.func
  }

  state = {
    isCollapse: true
  }

  toggleCollapse() {
    this.setState({ isCollapse: !this.state.isCollapse })
  }

  render() {
    return (
      <StationGroupItemWrapper>
        <GroupLabel onClick={this.toggleCollapse}>
          <span>{this.props.stationType}</span>
          {this.state.isCollapse ? <Icon type="down" /> : <Icon type="right" />}
        </GroupLabel>
        <Collapse isOpen={this.state.isCollapse}>
          <StationList>
            {this.props.stations.map(station => (
              <StationItem
                onClick={() => this.props.onSelectStation(station)}
                isActive={this.props.stationSelected.key === station.key}
                key={station.key}
              >
                {station.name}
              </StationItem>
            ))}
          </StationList>
        </Collapse>
      </StationGroupItemWrapper>
    )
  }
}
