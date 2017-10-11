import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const IIcon = styled.i`
  ${props => (props.size ? `font-size: ${props.size}` : '')}, ${props => (props.color ? `color: ${props.color}` : '')};
`

export default function Icon({ fontAwesome, name, size, color }) {
  let iconName = `icon-${name}`
  if (fontAwesome) iconName = `fa fa-${name}`
  return <IIcon className={iconName} size={size} color={color} />
}
Icon.propTypes = {
  fontAwesome: PropTypes.bool,
  name: PropTypes.string
}
