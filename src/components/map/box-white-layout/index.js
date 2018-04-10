import React from 'react'
import { autobind } from 'core-decorators'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import Heading from './Heading'

const BoxWhiteLayoutWrapper = styled.div`
  display: flex;
  flex-direction: column;
`
const WrapperWhite = styled.div`
  flex: 1;
  background-color: #ffffff;
  border: 1px solid #eeeeee;
  border-top: 0px;
  ${props => (!props.noPadding ? `padding: 16px 16px;` : ``)};
`

@autobind
export default class BoxWhiteLayout extends React.PureComponent {
  static propTypes = {
    title: PropTypes.string,
    right: PropTypes.object,
    style: PropTypes.object,
    noPadding: PropTypes.bool
  }
  render() {
    return (
      <BoxWhiteLayoutWrapper style={this.props.style}>
        <Heading right={this.props.right}>{this.props.title}</Heading>
        <WrapperWhite noPadding={this.props.noPadding}>
          {this.props.children}
        </WrapperWhite>
      </BoxWhiteLayoutWrapper>
    )
  }
}
