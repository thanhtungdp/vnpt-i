import React from 'react'
import PropTypes from 'prop-types'
import { autobind } from 'core-decorators'
import styled from 'styled-components'

const SummaryItemWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  opacity: 0.85;
  border-radius: 4px;
  padding: 12px 16px;
  background-color: ${props => props.color};
`

const StationTypeImg = styled.img`
  width: 40px;
  height: 28.4px;
`

const Text = styled.span`
  color: #ffffff;
  display: block;
`

const TextNumber = Text.extend`
  font-size: 20px;
`

const TextDescription = Text.extend`
  font-size: 14px;
`

@autobind
export default class SummaryItem extends React.PureComponent {
  static propTypes = {
    number: PropTypes.number,
    name: PropTypes.string,
    image: PropTypes.string,
    color: PropTypes.string
  }

  render() {
    const { number, name, image, color } = this.props
    return (
      <SummaryItemWrapper color={color}>
        <div>
          <TextNumber>{number}</TextNumber>
          <TextDescription>{name}</TextDescription>
        </div>
        <StationTypeImg src={image} />
      </SummaryItemWrapper>
    )
  }
}
