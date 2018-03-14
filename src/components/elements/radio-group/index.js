import React from 'react'
import PropTypes from 'prop-types'
import { autobind } from 'core-decorators'
import styled from 'styled-components'
import Label from '../label'
import { Radio } from 'antd'

const RadioGroup = Radio.Group
const Container = styled.div`
  display: flex;
  flex-direction: column;
  .crdjFp,
  .jGirHg {
    display: block;
  }
`

@autobind
export default class RadioGroupCustom extends React.PureComponent {
  static propTypes = {
    onChange: PropTypes.func,
    initialValue: PropTypes.number,
    dataItems: PropTypes.arrayOf(
      PropTypes.shape({
        label: PropTypes.string,
        value: PropTypes.number
      })
    )
  }

  handleChangeValue(e) {
    if (this.props.dataItems.length === 0) return {}
    if (typeof e.target.value === 'number') {
      let item = this.props.dataItems.find(
        item => item.value === e.target.value
      )
      this.props.onChange(item)
    }
  }

  getValue() {
    if (this.props.value) {
      return this.props.value.value
    }
    if (this.props.initialValue) {
      return this.props.initialValue
    }
    return 0
  }

  componentDidMount() {
    if (typeof this.props.initialValue === 'number') {
      let item = this.props.dataItems.find(
        item => item.value === this.props.initialValue
      )
      this.props.onChange(item)
    }
  }

  render() {
    return (
      <div style={{ width: '100%', display: 'block' }}>
        {this.props.label && <Label>{this.props.label}</Label>}
        <Container>
          <RadioGroup
            options={this.props.dataItems == null ? [] : this.props.dataItems}
            onChange={this.handleChangeValue}
            value={this.getValue()}
          />
        </Container>
      </div>
    )
  }
}
