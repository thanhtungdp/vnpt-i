import React from 'react'
import PropTypes from 'prop-types'
import { autobind } from 'core-decorators'
import styled from 'styled-components'
import SummaryItem from '../summary-item'

const SummaryListWrapper = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  margin-left: -8px;
  margin-right: -8px;
`

const SummaryItemContainer = styled.div`
  padding: 0px 8px;
  flex: 1;
`

@autobind
export default class SummaryList extends React.PureComponent {
  static propTypes = {
    data: PropTypes.arrayOf(PropTypes.shape(SummaryItem.propTypes))
  }

  render() {
    return (
      <SummaryListWrapper>
        {this.props.data.map(item => (
          <SummaryItemContainer key={item.name}>
            <SummaryItem {...item} />
          </SummaryItemContainer>
        ))}
      </SummaryListWrapper>
    )
  }
}
