import React from 'react'
import PropTypes from 'prop-types'
import { autobind } from 'core-decorators'
import styled from 'styled-components'
import MeasuringItem from '../measuring-item'

const MeasuringListWrapper = styled.div`
  padding: 16px 0 0px 0px;
  display: flex;
  flex-wrap: wrap;
  margin-left: -8px;
  margin-right: -8px;
`

const MeasuringItemWrapper = styled.div`
  padding: 0px 8px;
  width: 20%;
`

@autobind
export default class MeasuringList extends React.PureComponent {
  static propTypes = {
    data: PropTypes.arrayOf(PropTypes.shape(MeasuringItem.propTypes))
  }
  render() {
    return (
      <MeasuringListWrapper>
        {this.props.data &&
          this.props.data.length !== 0 &&
          this.props.data.map(item => (
            <MeasuringItemWrapper key={item.key}>
              <MeasuringItem {...item} />
            </MeasuringItemWrapper>
          ))}
      </MeasuringListWrapper>
    )
  }
}
