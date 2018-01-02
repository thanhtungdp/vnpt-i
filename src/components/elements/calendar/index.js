import React from 'react'
import Label from '../label'
import { DatePicker, DateTimePicker } from '@atlaskit/datetime-picker'
import styled from 'styled-components'

const Container = styled.div`
  display: flex;
  flex-direction: column;
`

export default class CalendarCustom extends React.PureComponent {
  handleChange(values) {
    console.log('onChange', values)
  }
  render() {
    return (
      <div style={{ width: '100%', display: 'block' }}>
        <Label>{this.props.label}</Label>
        <Container>
          <DateTimePicker
            {...this.props}
            onChange={this.handleChange}
            autoFocus={false}
            value={'2017-01-01'}
          />
        </Container>
      </div>
    )
  }
}
