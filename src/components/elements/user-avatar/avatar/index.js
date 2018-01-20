import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import AvatarCharacter from '../character'

const ImageAvatar = styled.img`
  width: ${props => props.size}px;
  height: ${props => props.size}px;
  border-radius: ${props => props.size / 2}px;
`

export default function Avatar ({ avatar, avatarSize = 24, username }) {
  return avatar
    ? <ImageAvatar size={avatarSize} src={avatar} />
    : <AvatarCharacter size={avatarSize} username={username} />
}

Avatar.propTypes = {
  avatar: PropTypes.string,
  avatarSize: PropTypes.number,
  username: PropTypes.string
}
