import React from 'react'
import PropTypes from 'prop-types'
import { autobind } from 'core-decorators'
import styled from 'styled-components'
import { Sticky, StickyContainer } from 'react-sticky'
import StationAutoList from './station-auto-list'
import HeadStationType from './HeadStationType'
// import Measuring from './Measuring'
// import slug from 'constants/slug'

const StationTypeWrapper = styled.div``

@autobind
export default class StationTypeSummary extends React.PureComponent {
  static propTypes = {
    stationType: PropTypes.object,
    stationAutoList: PropTypes.array
  }

  render() {
    const { stationType, stationAutoList } = this.props
    if (stationAutoList.length === 0) return null
    return (
      <StickyContainer>
        <StationTypeWrapper>
          <Sticky>
            {props => (
              <div
                style={{
                  ...props.style,
                  top: props.isSticky ? '68.8px' : null,
                  transition: 'all .3s linear'
                }}
              >
                <HeadStationType>
                  {stationType.name} ({stationAutoList.length})
                </HeadStationType>
              </div>
            )}
          </Sticky>
          <StationAutoList stationAutoList={stationAutoList} />
        </StationTypeWrapper>
      </StickyContainer>
    )
  }
}
