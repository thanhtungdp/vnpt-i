import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const HeadingWrapper = styled.div`
  padding: 16px 0px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  ${props =>
    props.isBackground
      ? `
     background: linear-gradient(135deg,#1d89ce 0%,#56d2f3 100%);
     padding: 16px 16px;
  `
      : null};
`

const H4 = styled.h4`
  font-size: ${props => props.fontSize}px;
  margin-bottom: 0px;
  font-weight: 600;
  ${props => (props.color ? `color: ${props.color};` : '')};
`

export default class Heading extends React.PureComponent {
  static propTypes = {
    rightChildren: PropTypes.any,
    fontSize: PropTypes.number,
    isBackground: PropTypes.bool
  }

  static defaultProps = {
    fontSize: 18,
    style: {}
  }

  render() {
    return (
      <HeadingWrapper
        isBackground={this.props.isBackground}
        style={this.props.style}
      >
        <H4 color={this.props.textColor} fontSize={this.props.fontSize}>
          {this.props.children}
        </H4>
        {this.props.rightChildren}
      </HeadingWrapper>
    )
  }
}
