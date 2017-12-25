import React from 'react'
import { Button } from 'reactstrap'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { createComponentDisableProps } from 'utils/styled'
import color from 'color'
import Loader from '../loader-circle'

import { SHAPE } from 'themes/color'

function getBackgroundColor (props) {
  let backgroundColor = ''
  let colorText = '#fff'
  switch (props.customColor) {
    case 'red':
      backgroundColor = SHAPE.RED
      break
    case 'green':
      backgroundColor = SHAPE.GREEN
      break
    case 'orange':
      backgroundColor = SHAPE.ORANGE
      break
    case 'purple':
      backgroundColor = SHAPE.PURPLE
      break
    case 'primary':
      backgroundColor = SHAPE.PRIMARY
      break
    case 'primarybold':
      backgroundColor = SHAPE.PRIMARYBOLD
      break
    case 'yellow':
      backgroundColor = SHAPE.YELLOW
      break
    default:
  }
  if (!backgroundColor) return ``
  return `
    background-color: ${backgroundColor};
    color: ${colorText};
    :disabled{
      background-color: ${backgroundColor};
      opacity: .65;
    }
    :hover{
      background-color: ${color(backgroundColor).darken(0.2)};
      color: ${colorText};
      cursor: pointer;
    }
  `
}

const ButtonStyle = styled(
  createComponentDisableProps(Button, ['shadowButton', 'customColor', 'borderRadius', 'block'])
)`
  font-size: ${props => props.fontSize}px;
  font-family: Open Sans;
  border: 0px;
  border-radius: ${props => (props.borderRadius ? props.borderRadius : 3)}px !important;
  ${props => (props.block ? 'width: 100%;' : '')}
  ${props => (props.shadowButton ? `
   background-color: linear-gradient(180deg,#fffffe,#fbfeff);
   border: 1px solid rgba(94,176,240,.98);
   color: #389bff;
   &:hover{
     background-color: #389bff;
     color: #ffffff;
     cursor: pointer;
    border: 1px solid rgba(94,176,240,.98);
   }
   &:focus{
     outline: none;
   }
 ` : '')}
 ${props => getBackgroundColor(props)}
`
ButtonStyle.defaultProps = {
  fontSize: 14,
  shadowButton: false,
  customColor: ''
}

export default function ButtonCustom ({ isLoading, ...props }) {
  return (
    <ButtonStyle {...props}>
      {isLoading && <Loader isCenter size={20} color='#fff' />}
      {!isLoading ? props.children : null}
    </ButtonStyle>
  )
}

ButtonCustom.propTypes = {
  fontSize: PropTypes.number,
  borderRadius: PropTypes.number,
  shadowButton: PropTypes.bool,
  customColor: PropTypes.string,
  isLoading: PropTypes.bool,
  block: PropTypes.bool
}
