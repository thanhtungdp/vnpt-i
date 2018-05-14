import React from 'react'
import styled from 'styled-components'
import { SHAPE } from 'themes/color'
import { connect } from 'react-redux'

const LogoContainer = styled.div`
  display: flex;
  align-items: center;
  padding: 0px 8px;
`

const LogoIcon = styled.img`
  height: 35px;
  width: auto;
`

const InfoWrapper = styled.div`
  padding-left: 8px;
`

const TextPlaceholder = styled.div`
  color: ${SHAPE.GRAYTEXT};
  font-size: 12px;
  position: relative;
`

const RegisterBrand = styled.span`
  position: relative;
  font-size: 9px;
  top: -2px;
`

const BrandName = styled.span`
  font-size: 16px;
  font-weight: 600;
  margin-top: 8px;
  color: ${SHAPE.BLACK};
`

export function LogoBrandName(props) {
  return (
    <LogoContainer>
      <LogoIcon src="/images/logo/icon/enviroment.png" />
      <InfoWrapper>
        <TextPlaceholder>
          iLotusLand for Environment <RegisterBrand>&trade;</RegisterBrand>
        </TextPlaceholder>
        <BrandName>{props.name}</BrandName>
      </InfoWrapper>
    </LogoContainer>
  )
}

export default connect(state => ({
  name: state.auth.userInfo.organization.name
}))(LogoBrandName)
