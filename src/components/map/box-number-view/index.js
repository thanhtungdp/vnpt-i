import React from 'react'
import { autobind } from 'core-decorators'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import Clearfix from 'components/elements/clearfix'

const BoxViewWrapper = styled.div`
  padding: 16px 16px;
  background-color: #ffffff;
  border: 1px solid #eeeeee;
  display: flex;
  align-items: center;
  flex-direction: column;
  color: ${props => props.color};
`

const Number = styled.span`
  font-size: 35px;
  line-height: normal;
  font-weight: 600;
`

const Type = styled.span`
  line-height: normal;
  font-size: 20px;
`

@autobind
export default class BoxView extends React.PureComponent {
  static propTypes = {
    number: PropTypes.string,
    type: PropTypes.string,
    color: PropTypes.string
  }
  render() {
    return (
      <BoxViewWrapper color={this.props.color}>
        <Number>{this.props.number}</Number>
        <Clearfix height={8} />
        <Type>{this.props.type}</Type>
      </BoxViewWrapper>
    )
  }
}
