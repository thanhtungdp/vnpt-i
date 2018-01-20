import React from 'react'
import quizListStatusType from 'constants/quizListStatusType'
import PropTypes from 'prop-types'
import { autobind } from 'core-decorators'
import Icon from 'themes/icon'
import SingleSelect from '../../elements/single-select'

const dataOptions = [
  {
    heading: 'Trạng thái',
    items: [
      {
        icon: Icon.car,
        value: quizListStatusType.NEW,
        content: 'Duyệt đề'
      },
      {
        value: quizListStatusType.OLD,
        content: 'Bài đăng cũ'
      },
      {
        value: quizListStatusType.NEED_REVIEW,
        content: 'Cần kiểm duyệt'
      },
      {
        value: quizListStatusType.REJECTED,
        content: 'Từ chối'
      }
    ]
  }
]

@autobind
export default class QuizListStatusSelect extends React.Component {
  static propTypes = {
    value: PropTypes.any,
    onChange: PropTypes.func
  }

  constructor(props) {
    super(props)
    this.state = {
      status: props.value ? props.value : ''
    }
  }

  handleChange(item) {
    this.setState({ status: item })
    if (this.props.onChange) {
      this.props.onChange(item)
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.value !== this.props.value) {
      this.setState({ status: nextProps.value })
    }
  }

  render() {
    return (
      <SingleSelect
        dataItems={dataOptions}
        {...this.props}
        hasAutocomplete={false}
        onChange={this.handleChange}
        value={this.state.status}
      />
    )
  }
}
