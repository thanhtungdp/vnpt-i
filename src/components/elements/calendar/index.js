import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import DatePicker from 'react-datepicker'
import Label from '../label'
import styled from 'styled-components'
import Moment from 'moment'

const Container = styled.div`
  display: flex;
  flex-direction: column;
`

export default class CalendarCustom extends PureComponent {
  render() {
    return (
      <div style={{ width: '100%', display: 'block' }}>
        <Label>{this.props.label}</Label>
        <Container>
          <DatePicker
            selected={this.props.value ? Moment(this.props.value) : Moment()}
            dateFormat="DD/MM/YYYY"
            onChange={date => this.props.onChange(date)}
            showMonthDropdown
            showYearDropdown
            dropdownMode="select"
          />
        </Container>
      </div>
    )
  }
}
