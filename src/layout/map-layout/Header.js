import React from 'react'
import { autobind } from 'core-decorators'
import { Link } from 'react-router-dom'
import { PRIMARY } from 'themes/color'
import styled from 'styled-components'

const HeaderWrapper = styled.div`
  display: flex;
  padding: 8px 8px;
  background-color: ${PRIMARY};
  justify-content: space-between;
`

const Title = styled.h1`
  font-size: 16px;
  margin-top: 0px;
  margin-bottom: 0px;
  color: #ffffff;
`

const LeftTitle = styled.div``

const MenuList = styled.div`
  display: flex;
`

const Line = styled.div`
  width: 1px;
  height: 100%;
  margin-left: 4px;
  margin-right: 4px;
`

const LinkA = styled(Link)`
  color: #ffffff;
  &:hover {
    text-decoration: none;
  }
`

@autobind
export default class Header extends React.PureComponent {
  render() {
    return (
      <HeaderWrapper>
        <LeftTitle>
          <Title>Map overview</Title>
        </LeftTitle>
        <MenuList>
          <LinkA to="/">AQI</LinkA>
          <Line />
          <LinkA to="/">WQI</LinkA>
        </MenuList>
      </HeaderWrapper>
    )
  }
}
