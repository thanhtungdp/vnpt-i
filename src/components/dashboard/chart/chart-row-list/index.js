import React from 'react'
import { autobind } from 'core-decorators'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import ChartRow from '../chart-row'

const ChartRowListWrapper = styled.div`
  display: flex;
  flex-direction: column;
`

const ChartRowWrapper = styled.div`
  margin-bottom: 8px;
`

@autobind
export default class ChartRowList extends React.PureComponent {
  static propTypes = {
    data: PropTypes.arrayOf(PropTypes.shape(ChartRow.propTypes))
  }

  render() {
    return (
      <ChartRowListWrapper>
        {this.props.data.map(item => (
          <ChartRowWrapper key={item.key}>
            <ChartRow {...item} />
          </ChartRowWrapper>
        ))}
      </ChartRowListWrapper>
    )
  }
}
