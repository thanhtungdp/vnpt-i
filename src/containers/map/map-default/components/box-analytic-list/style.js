import styled from 'styled-components'
import BoxNumberView from 'components/map/box-number-view'

const Row = styled.div`
  display: flex;
  margin-left: -4px;
  margin-right: -4px;
`

const Item = styled.div`
  padding: 0px 4px;
  width: ${props =>
    props.isFullWidth ? '100%' : props.isThree ? '33.3%' : '50%'};
`

const Clearfix = styled.div`
  height: 8px;
`

export { Row, Item, Clearfix, BoxNumberView }

export default {
  BoxNumberView,
  Row,
  Item,
  Clearfix
}
