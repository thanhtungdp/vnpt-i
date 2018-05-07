import React from 'react'
import PropTypes from 'prop-types'
import { autobind } from 'core-decorators'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import slug from 'constants/slug'
const SummaryItemWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  opacity: 0.85;
  border-radius: 4px;
  padding: 12px 16px;
  background-color: ${props => props.color};
  &:hover {
    cursor: pointer;
  }
`

const StationTypeImg = styled.img`
  width: 40px;
  height: auto;
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
    color: PropTypes.string,
    stationTypeKey: PropTypes.string
  }

  render() {
    const { number, name, image, color, stationTypeKey } = this.props
    return (
      <Link to={slug.monitoring.base + `?Id=${stationTypeKey}`}>
        <SummaryItemWrapper color={color}>
          <div>
            <TextNumber>{number}</TextNumber>
            <TextDescription>{name}</TextDescription>
          </div>
          <StationTypeImg src={image} />
        </SummaryItemWrapper>
      </Link>
    )
  }
}
