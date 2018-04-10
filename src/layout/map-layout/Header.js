import React from 'react'
import { autobind } from 'core-decorators'
import { Link } from 'react-router-dom'
import { PRIMARY } from 'themes/color'
import styled from 'styled-components'
import { Icon } from 'antd'
import Clearfix from 'components/elements/clearfix'

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

const LeftTitle = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
`

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

const LinkB = styled(Link)`
  color: #ffffff;
  &:hover {
    text-decoration: none;
    opacity: 0.5;
  }
  width: 20px;
`

@autobind
export default class Header extends React.PureComponent {
  render() {
    return (
      <HeaderWrapper>
        <LeftTitle>
          <Clearfix width={4} />
          <LinkB to="/">
            {' '}
            <Icon type="left" style={{ color: 'white', fontSize: 18 }} />
          </LinkB>
          <Clearfix width={8} />
          <Title> Map overview</Title>
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
