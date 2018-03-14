import React, { PureComponent } from 'react'
import { DatePicker } from 'antd'
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
const dateFormat = 'DD/MM/YYYY'

export default class CalendarCustom extends PureComponent {
  getRealy() {
    if (typeof this.props.value === 'string') {
      return moment(this.props.value, 'DD/MM/YYYY')
    } else return this.props.value
  }

  render() {
    //khi xử dung Form của Ant getFieldDecorator thì giá trị mặc định luôn là
    return (
      <div style={{ width: '100%', display: 'block' }}>
        <Label>{this.props.label}</Label>
        <Container>
          <DatePicker
            value={this.getRealy()}
            defaultValue={moment()}
            onChange={date => this.props.onChange(date)}
            format={dateFormat}
          />
        </Container>
      </div>
    )
  }
}
