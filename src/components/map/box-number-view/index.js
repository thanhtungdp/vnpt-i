import React from 'react'
import { autobind } from 'core-decorators'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import Clearfix from 'components/elements/clearfix'
import { Spin, Checkbox } from 'antd'

const BoxViewWrapper = styled.div`
  padding: 16px 16px;
  background-color: #ffffff;
  //border: 1px solid #eeeeee;
  display: flex;
  align-items: center;
  flex-direction: column;
  color: ${props => props.color};
  height: 100px;
`

const Number = styled.span`
  font-size: 25px;
  line-height: normal;
  font-weight: 200;
`

const Type = styled.span`
  line-height: normal;
  font-size: 12px;
`

const Layout = styled.div`
  background-color: #ffffff;
  border: 1px solid #eeeeee;
  display: flex;
  flex-direction: column;
  height: 100px;
  cursor: pointer;
`

const RightLayout = styled.div`
  height: 0px;
  z-index: 100;
  display: flex;
  justify-content: flex-end;
  // position: absolute;
`

@autobind
export default class BoxView extends React.PureComponent {
  static propTypes = {
    number: PropTypes.number,
    type: PropTypes.string,
    color: PropTypes.string,
    focusStatus: PropTypes.string,
    focusParam: PropTypes.array
  }

  state = {
    isChecked: false
  }

  handleClickBox() {
    if (this.props.focusStatus && this.props.focusParam) {
      this.setState({
        isChecked: false
      })
    } else
      this.setState({
        isChecked: !this.state.isChecked
      })
  }

  componentWillMount(){
    console.log(this.props)
  }

  render() {
    return (
      <Layout onClick={this.handleClickBox}>
        <RightLayout>
          <Checkbox
            checked={
              this.props.focusStatus && this.props.focusParam
                ? this.props.focusParam.includes(this.props.focusStatus)
                : this.state.isChecked
            }
          />
          <Clearfix width={4} />
        </RightLayout>
        <BoxViewWrapper color={this.props.color}>
          <Number>
            {this.props.number !== -1 ? this.props.number : <Spin />}
          </Number>
          <Clearfix height={8} />
          <Type>{this.props.type}</Type>
        </BoxViewWrapper>
      </Layout>
    )
  }
}
