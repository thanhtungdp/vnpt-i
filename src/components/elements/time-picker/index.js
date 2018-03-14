import React from 'react'
import PropTypes from 'prop-types'
import { autobind } from 'core-decorators'
import styled from 'styled-components'
import Label from '../label'
import { TimePicker } from 'antd'
import moment from 'moment'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  .crdjFp,
  .jGirHg {
    display: block;
  }
`
const format = 'HH:mm'

@autobind
export default class TimerPicker extends React.PureComponent {
  static propTypes = {
    onChange: PropTypes.func,
    defaultValue: PropTypes.string
  }

  render() {
    const { label, ...otherProps } = this.props
    return (
      <div style={{ width: '100%', display: 'block' }}>
        {label && <Label>{label}</Label>}
        <Container>
          <TimePicker
            {...otherProps}
            onChange={this.props.onChange}
            defaultValue={moment()}
            format={format}
          />
        </Container>
      </div>
    )
  }
}
