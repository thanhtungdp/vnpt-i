import React from 'react'
import PropTypes from 'prop-types'
import { autobind } from 'core-decorators'
import styled from 'styled-components'
import { PRIMARY } from 'themes/color'

const HeadingWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: ${PRIMARY};
  color: #ffffff;
  ${props => (props.noPadding ? 'width: 100%;' : 'padding: 8px 16px;')};
`

@autobind
export default class Heading extends React.PureComponent {
  static propTypes = {
    right: PropTypes.any,
    onlyTitle: PropTypes.bool,
    noPadding: PropTypes.bool
  }

  render() {
    if (this.props.onlyTitle)
      return (
        <HeadingWrapper noPadding={this.props.noPadding}>
          {this.props.children}
        </HeadingWrapper>
      )
    return (
      <HeadingWrapper noPadding={this.props.noPadding}>
        <span>{this.props.children}</span>
        {this.props.right}
      </HeadingWrapper>
    )
  }
}
