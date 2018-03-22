import React from 'react'
import { Form, Button, Row, Col } from 'antd'
import PropTypes from 'prop-types'
import { autobind } from 'core-decorators'
import { mapPropsToFields } from 'utils/form'
import createLanguage, { langPropTypes } from 'hoc/create-lang/index'
import Clearfix from 'components/elements/clearfix/index'
import RadioGroupCustom from 'components/elements/radio-group/index'
import TimerPicker from 'components/elements/time-picker/index'
import CalendarCustom from 'components/elements/datetime-picker/index'
import InputNumberCell from 'components/elements/input-number-cell/index'
import moment from 'moment'

const FormItem = Form.Item

const items = [{ label: 'Bằng tay', value: 1 }, { label: 'Tự động', value: 0 }]

@Form.create({
  mapPropsToFields: mapPropsToFields
})
@createLanguage
@autobind
export default class ControlStationTrigger extends React.PureComponent {
  static propTypes = {
    stationKey: PropTypes.string,
    stationName: PropTypes.string,
    onSubmit: PropTypes.func,
    lang: langPropTypes,
    isEdit: PropTypes.bool,
    isTriggerExceeded: PropTypes.bool,
    typeControl: PropTypes.bool,
    isTriggerAuto: PropTypes.bool
  }

  constructor(props) {
    super(props)
    this.state = {
      autoControl: this.props.typeControl
    }
  }

  /*async componentWillMount() {}

  async componentDidMount() {}*/

  handleSubmitExceeded() {
    this.props.handleSubmitExceeded(
      this.props.stationKey,
      !this.props.isTriggerExceeded
    )
  }

  handleSubmit(e) {
    this.props.form.validateFields((err, values) => {
      if (err) return
      const typeControl = values.typeControl.value
      //Kichs hoat  lấy mẫu và huỷ lấy mẫu
      let istriggerAuto =
        this.props.isTriggerAuto === true && this.props.typeControl === 0
          ? false
          : true
      let data = {
        trangThai: istriggerAuto,
        MaTram: this.props.stationKey,
        Username: 'Host',
        ChaiCanLay: values.amount_get,
        ThuCong: typeControl, //0: tu dong; 1: thu cong
        ChuKyLayMau: null,
        HenGio: null
      }
      if (typeControl === 0) {
        const datetime = moment(
          (typeof values.date === 'string'
            ? values.date
            : values.date.format('YYYY/MM/DD')) +
            ' ' +
            values.timer.format('HH:mm')
        )
        data = {
          ...data,
          ChuKyLayMau: values.periodic,
          HenGio: datetime
        }
      }
      // Callback submit form Container Component
      this.props.onSubmit(data)
    })
  }

  changeTypeControl(values) {
    if (values === undefined) return
    this.setState({
      autoControl: values.value
    })
  }

  render() {
    const { form: { getFieldDecorator } } = this.props
    return (
      <Form>
        <Row gutter={16}>
          <Col span={12}>
            <FormItem label={'Total'}>
              {getFieldDecorator('total')(
                <InputNumberCell
                  editable={false}
                  disabled={this.props.isEdit}
                  placeholder="Total"
                />
              )}
            </FormItem>
          </Col>
          <Col span={12}>
            <FormItem label={'Total have taken'}>
              {getFieldDecorator('totalTaken')(
                <InputNumberCell
                  editable={false}
                  disabled={this.props.isEdit}
                  placeholder="Total have taken"
                />
              )}
            </FormItem>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={8}>
            {getFieldDecorator('typeControl')(
              <RadioGroupCustom
                label={'Type control'}
                initialValue={this.props.typeControl}
                onChange={items => this.changeTypeControl(items)}
                dataItems={items}
              />
            )}
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={24}>
            <FormItem label={'Amount to get'}>
              {getFieldDecorator('amount_get', {
                rules: [
                  {
                    required: true,
                    message: 'Required'
                  }
                ]
              })(
                <InputNumberCell
                  editable={true}
                  disabled={this.props.isEdit}
                  placeholder="Amount to get"
                />
              )}
            </FormItem>
          </Col>
        </Row>
        {console.log(this.props, this.state.autoControl, 'tessd')}
        {this.state.autoControl === 0 ? (
          <div>
            <Row gutter={50} type="flex" justify="center">
              <Col span={12}>
                {getFieldDecorator('timer')(<TimerPicker label={'Timer'} />)}
              </Col>
              <Col span={12}>
                {getFieldDecorator('date')(<CalendarCustom label={'Date'} />)}
              </Col>
            </Row>
            <Row gutter={16} type="flex" justify="center">
              <Col span={24}>
                <FormItem label={'Periodic'}>
                  {getFieldDecorator('periodic', {
                    rules: [
                      {
                        required: true,
                        message: 'Required'
                      }
                    ]
                  })(
                    <InputNumberCell
                      editable={true}
                      disabled={this.props.isEdit}
                      placeholder="Periodic"
                    />
                  )}
                </FormItem>
              </Col>
            </Row>
          </div>
        ) : (
          ''
        )}
        <FormItem>
          <Button
            style={{ width: '100%' }}
            type="primary"
            htmlType="button"
            onClick={this.handleSubmit}
          >
            {this.props.isTriggerAuto === true && this.props.typeControl === 0
              ? 'CANCEL TRIGGER'
              : 'TRIGGER'}
          </Button>
          <Clearfix />
          <Button
            style={{ width: '100%' }}
            typ="primary"
            htmlType="button"
            onClick={this.handleSubmitExceeded}
          >
            {this.props.isTriggerExceeded === true
              ? 'CANCEL TRIGGER EXCEEDED'
              : 'TRIGGER EXCEEDED'}
          </Button>
        </FormItem>
      </Form>
    )
  }
}
