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

export default function AvatarCharacter({ size = 30, username }) {
  return (
    <View size={size} backgroundColor={getColorFromText(username)}>
      <Span size={size / 2}>{username[0].toUpperCase()}</Span>
    </View>
  )
}
AvatarCharacter.propTypes = {
  username: PropTypes.string,
  size: PropTypes.number
}
