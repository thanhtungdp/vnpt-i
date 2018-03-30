import React from 'react'
import PropTypes from 'prop-types'
import { autobind } from 'core-decorators'
import styled from 'styled-components'
import { PRIMARY } from 'themes/color'

const HeadingWrapper = styled.div`
  padding: 8px 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: ${PRIMARY};
  color: #ffffff;
`

@autobind
export default class Heading extends React.PureComponent {
  static propTypes = {
    right: PropTypes.any
  }

  render() {
    return (
      <HeadingWrapper>
        <span>{this.props.children}</span>
        {this.props.right}
      </HeadingWrapper>
    )
  }
}
