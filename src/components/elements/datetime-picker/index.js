import React, { PureComponent } from 'react'
import DatePicker from 'react-datepicker'
import Label from '../label'
import styled from 'styled-components'
import moment from 'moment'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  .react-datepicker-wrapper,
  .react-datepicker-wrapper .react-datepicker__input-container {
    width: 100%;
  }
`

export default class CalendarCustom extends PureComponent {
  render() {
    return (
      <div style={{ width: '100%', display: 'block' }}>
        <Label>{this.props.label}</Label>
        <Container>
          <DatePicker
            selected={this.props.value ? moment(this.props.value) : moment()}
            dateFormat="DD/MM/YYYY"
            onChange={date => this.props.onChange(date)}
            showMonthDropdown
            showYearDropdown
            className="form-control fullwidth"
            dropdownMode="select"
          />
        </Container>
      </div>
    )
  }
}
