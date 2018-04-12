import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { getColorFromText } from 'utils/color'

const View = styled.div`
  width: ${props => props.size}px;
  height: ${props => props.size}px;
  border-radius: ${props => props.size / 2}px;
  color: #ffffff;
  background-color: ${props => props.backgroundColor};
  display: flex;
  align-items: center;
  justify-content: center;
`

const Span = styled.span`
  color: #ffffff;
  font-size: ${props => props.size}px;
  font-weight: 600;
`

const LogoUser = styled.img`
  height: 35px;
  width: auto;
  border-radius: 17.5px;
`

export default function AvatarCharacter({ size = 30, username, avatarUrl }) {
  if (avatarUrl && avatarUrl.indexOf('http:/') != -1) {
    avatarUrl = avatarUrl.replace('http:/', 'http://')
  }

  return (
    <View size={size} backgroundColor={getColorFromText(username)}>
      {avatarUrl ? (
        <LogoUser src={avatarUrl} />
      ) : (
        <Span size={size / 2}>{username[0].toUpperCase()}</Span>
      )}
    </View>
  )
}
AvatarCharacter.propTypes = {
  username: PropTypes.string,
  size: PropTypes.number
}
