import styled from 'styled-components'
import { Link } from 'react-router-dom'

const LinkCustom = styled(Link)`
  &:hover {
    cursor: pointer;
    text-decoration: none;
  }
`

export default LinkCustom
