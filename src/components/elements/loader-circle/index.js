import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import { SHAPE } from 'themes/color'

const View = styled.div`
  .loader {
    transition: all 0.7s ease-in-out;
    border: 5px solid ${SHAPE.GRAYMEDIUM};
    border-bottom-color: ${props => props.color};
    width: ${props => `${props.size}px`};
    height: ${props => `${props.size}px`};
    border-radius: ${props => `${props.size / 2}px`};
    -webkit-font-smoothing: antialiased !important;
    -webkit-animation: spin1 0.5s linear infinite;
  }

  ${props =>
    props.isCenter
      ? `
  display: flex;
  justify-content: center;
  `
      : null} @keyframes spin1 {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`

export default function LoaderCircle ({
  size = 25,
  color = SHAPE.PRIMARY,
  isCenter
}) {
  return (
    <View size={size} color={color} isCenter={isCenter}>
      <div className='loader' />
    </View>
  )
}
LoaderCircle.propTypes = {
  size: PropTypes.number,
  color: PropTypes.string,
  isCenter: PropTypes.bool
}
