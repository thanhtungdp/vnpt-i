import styled from 'styled-components'
import PropTypes from 'prop-types'
import { SHAPE } from 'themes/color'
import { getColorFromString } from 'utils/color'

const LinkA = styled.a`
  color: ${props => (props.color ? props.color : SHAPE.PRIMARYBOLD)} !important;
  ${props =>
    props.colorType
      ? `color: ${getColorFromString(props.colorType)} !important;`
      : ''}
  ${props => props.fontSize ? `font-size: ${props.fontSize}px;` : ''}
  ${props => props.fontWeight ? `font-weight: ${props.fontWeight};` : ''}
  :hover {
    cursor: pointer;
    text-decoration: none;
  }
`
LinkA.propTypes = {
  colorType: PropTypes.string,
  color: PropTypes.string,
  fontSize: PropTypes.number,
  fontWeight: PropTypes.number
}

export default LinkA
