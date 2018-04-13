import React from 'react'
import { autobind } from 'core-decorators'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Icon } from 'antd'

const BoxHideLayout = styled.div`
  display: flex;
  flex-direction: column;
  width: 8px;
  align-items: center;
  justify-content: center;
  border-top: 0px;

  &:hover {
    background-color: #2ba6e3;
    text-decoration: none;
    cursor: pointer;
  }
`

@autobind
export default class BoxHideLayoutComponent extends React.PureComponent {
  static propTypes = {
    isLeft: PropTypes.bool,
    isRight: PropTypes.bool
  }
  state = {
    type: 'caret-left',
    isLeft: true,
    isRight: false
  }

  async componentDidMount() {
    if (this.props.isRight)
      this.setState({
        isLeft: false,
        isRight: true
      })
  }

  getTypeIcon({ isLeft, isRight }) {
    if (isLeft) return 'caret-left'
    if (isRight) return 'caret-right'
    return 'caret-left'
  }

  handelOnLick() {
    this.setState(
      {
        isLeft: !this.state.isLeft,
        isRight: !this.state.isRight
      },
      () => {
        if (this.props.handelOnLick) this.props.handelOnLick(this.state)
      }
    )
  }

  render() {
    return (
      <BoxHideLayout onClick={this.handelOnLick}>
        <Icon
          type={this.getTypeIcon(this.state)}
          style={{ color: 'white', fontSize: '8px' }}
        />
      </BoxHideLayout>
    )
  }
}
