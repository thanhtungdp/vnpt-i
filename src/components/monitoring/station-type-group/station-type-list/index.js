import React from 'react'
import PropTypes from 'prop-types'
import { autobind } from 'core-decorators'
import styled from 'styled-components'
import StationTypeItem from '../station-type-item'

const StationTypeListWrapper = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  margin-left: -8px;
  margin-right: -8px;
  .stationTypeItem {
    margin-bottom: 16px;
  }
`

const StationTypeContainer = styled.div`
  padding: 0px 8px;
  flex: 1;
`

@autobind
export default class StationTypeList extends React.Component {
  static propTypes = {
    data: PropTypes.arrayOf(PropTypes.shape(StationTypeItem.propTypes))
  }

  sortStationType(a, b) {
    return a.stationType.numericalOrder - b.stationType.numericalOrder
  }

  render() {
    return (
      <StationTypeListWrapper>
        <StationTypeContainer>
          {this.props.data
            .sort(this.sortStationType)
            .filter(item => item.stationAutoList.length > 0)
            .map((item, index) => (
              <div key={index} className="stationTypeItem">
                <StationTypeItem {...item} />
              </div>
            ))}
        </StationTypeContainer>
      </StationTypeListWrapper>
    )
  }
}
