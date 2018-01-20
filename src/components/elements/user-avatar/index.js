import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import Avatar from './avatar'
import { TEXT } from 'themes/color'

const View = styled.div`
  display: flex;
  align-items: center;
`

const Info = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 8px;
`

const SpanUsername = styled.span`
  font-weight: 600;
  font-size: ${props => props.size}px;
  ${props => (props.color ? `color: ${props.color}` : '')};
`

const SpanHello = styled.span`
  font-size: ${props => props.size}px;
  color: ${TEXT.GRAY};
`

const LinkUser = styled.a`
  &:hover {
    text-decoration: none;
    color: initial;
  }
  color: initial;
`

export default function UserAvatar({
  avatar,
  username,
  avatarSize,
  usernameSize,
  usernameColor,
  fullname,
  isLink
}) {
  let userComponent = (
    <View className="userAvatar">
      <Avatar avatar={avatar} avatarSize={avatarSize} username={username} />
      <Info className="userInfo">
        <SpanUsername color={usernameColor} size={usernameSize}>
          {username}
        </SpanUsername>
        {fullname && <SpanHello size={usernameSize}>{fullname}</SpanHello>}
      </Info>
    </View>
  )
  if (!isLink) return userComponent
  else {
    return (
      <LinkUser
        target="_blank"
        href={`https://tungtung.vn/${username}`}
        title={username}
      >
        {userComponent}
      </LinkUser>
    )
  }
}
UserAvatar.propTypes = {
  username: PropTypes.string,
  usernameColor: PropTypes.string,
  avatar: PropTypes.string,
  avatarSize: PropTypes.number,
  usernameSize: PropTypes.number,
  fullname: PropTypes.any,
  isLink: PropTypes.bool
}
UserAvatar.defaultProps = {
  avatarSize: 14,
  usernameSize: 13
}
