import React from 'react'
import { autobind } from 'core-decorators'
import styled from 'styled-components'
import BoxNumberView from 'components/map/box-number-view'
import { SHAPE } from 'themes/color'

const BoxAnalyticListWrapper = styled.div``

const Row = styled.div`
  display: flex;
  margin-left: -4px;
  margin-right: -4px;
`

const Item = styled.div`
  padding: 0px 4px;
  width: 50%;
`

const Clearfix = styled.div`
  height: 8px;
`

@autobind
export default class BoxAnalyticList extends React.PureComponent {
  render() {
    return (
      <BoxAnalyticListWrapper>
        <Row>
          <Item>
            <BoxNumberView color={SHAPE.GREEN} type="successed" number={20} />
          </Item>
          <Item>
            <BoxNumberView color={SHAPE.RED} type="error" number={30} />
          </Item>
        </Row>
        <Clearfix height={8} />
        <Row>
          <Item>
            <BoxNumberView color={SHAPE.ORANGE} type="warning" number={20} />
          </Item>
          <Item>
            <BoxNumberView color={SHAPE.YELLOW} type="error" number={50} />
          </Item>
        </Row>
      </BoxAnalyticListWrapper>
    )
  }
}
