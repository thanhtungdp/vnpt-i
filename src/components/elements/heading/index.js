import React from 'react'
import styled from 'styled-components'

const HeadingWrapper = styled.div`
  padding: 16px 0px;
`
const H4 = styled.h4`
  font-size: 18px;
  margin-bottom: 0px;
  font-weight: 600;
`

export default class Heading extends React.PureComponent{
  render(){
    return <HeadingWrapper>
      <H4>{this.props.children}</H4>
    </HeadingWrapper>
  }
}
