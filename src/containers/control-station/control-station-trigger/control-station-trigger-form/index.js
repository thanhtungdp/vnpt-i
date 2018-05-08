import React from 'react'
import styled from 'styled-components'
import { Row, Col } from 'antd'
import LoaderCircle from 'components/elements/loader-circle'
import PropTypes from 'prop-types'
import Button from 'components/elements/button/index'
import { reduxForm, Field } from 'redux-form'
import { autobind } from 'core-decorators'
import createLanguage from 'hoc/create-lang/index'
import createValidateComponent from 'components/elements/redux-form-validate/index'
import InputNumberCell from 'components/elements/input-number-cell/index'
import Clearfix from 'components/elements/clearfix/index'
import RadioGroupCustom from 'components/elements/radio-group/index'
import TimerPicker from 'components/elements/time-picker/index'
import CalendarCustom from 'components/elements/datetime-picker/index'
import { translate } from 'hoc/create-lang'

const items = [
  { label: translate('controlStation.handMade'), value: 1 },
  { label: translate('controlStation.autoMatic'), value: 0 }
]

const FTimerPicker = createValidateComponent(TimerPicker)
const FInputNumberCell = createValidateComponent(InputNumberCell)
const FRadioGroupCustom = createValidateComponent(RadioGroupCustom)
const FCalendarCustom = createValidateComponent(CalendarCustom)

const LevelLayout = styled.div`
  display: flex;
  align-items: center;
`

function validate(values) {
  const errors = {}
  if (!values.amount_get) {
    errors.amount_get = 'Required or Is greater than 0'
  }

  return errors
}

@reduxForm({
  form: 'ControlStationTriggerForm',
  validate
})
@createLanguage
@autobind
export default class ControlStationTriggerForm extends React.PureComponent {
  static propTypes = {
    onSubmit: PropTypes.func,
    handleSubmitExceeded: PropTypes.func,
    initialValues: PropTypes.object,
    typeControl: PropTypes.number,
    isSampling: PropTypes.bool,
    isSamplingAuto: PropTypes.bool,
    isTriggerExceeded: PropTypes.bool
  }

  state = {
    typeControl: this.props.typeControl
  }
  changeTypeControl(values) {
    if (values === undefined) return
    this.setState({
      typeControl: values.value
    })
  }

  render() {
    return (
      <form>
        <Row gutter={16}>
          <Col span={12}>
            <Field
              name="total"
              editable={true}
              disabled={true}
              label={translate('controlStation.total')}
              component={FInputNumberCell}
            />
          </Col>
          <Col span={12}>
            <Field
              name="totalTaken"
              editable={true}
              disabled={true}
              label={translate('controlStation.totalHaveTaken')}
              component={FInputNumberCell}
            />
          </Col>
        </Row>
        <Clearfix height={16} />
        <Row gutter={16}>
          <Col span={8}>
            <Field
              name="typeControl"
              label={translate('controlStation.typeControl')}
              onChange={items => this.changeTypeControl(items)}
              dataItems={items}
              component={FRadioGroupCustom}
            />
          </Col>
        </Row>
        <Clearfix height={16} />
        <Row gutter={16}>
          <Col span={24}>
            <Field
              name="amount_get"
              editable={true}
              label={translate('controlStation.amountToGet')}
              component={FInputNumberCell}
            />
          </Col>
        </Row>
        {this.state.typeControl === 0 ? (
          <div>
            <Clearfix height={16} />
            <Row gutter={50} type="flex" justify="center">
              <Col span={12}>
                <Field
                  name="timer"
                  label={translate('controlStation.timer')}
                  component={FTimerPicker}
                />
              </Col>
              <Col span={12}>
                <Field
                  name="date"
                  label={translate('controlStation.date')}
                  component={FCalendarCustom}
                />
              </Col>
            </Row>
            <Clearfix height={16} />
            <Row gutter={16} type="flex" justify="center">
              <Col span={24}>
                <Field
                  name="periodic"
                  editable={true}
                  disabled={false}
                  label={'Periodic'}
                  component={FInputNumberCell}
                />
              </Col>
            </Row>
          </div>
        ) : (
          ''
        )}
        <Clearfix height={16} />
        <Row gutter={16} type="flex" justify="center">
          <Col span={24}>
            {this.props.isSamplingAuto ? (
              <Button
                type="button"
                block
                color="primary"
                customColor="red"
                disabled={this.props.isSampling}
                isLoading={this.props.submitting}
                onClick={this.props.handleSubmit(
                  this.props.onCancel.bind(this)
                )}
              >
                CANCEL TRIGGER
              </Button>
            ) : (
              <Button
                type="button"
                block
                color="primary"
                disabled={this.props.isSampling}
                isLoading={this.props.submitting}
                onClick={this.props.handleSubmit(
                  this.props.onSubmit.bind(this)
                )}
              >
                TRIGGER
              </Button>
            )}

            <Clearfix height={16} />
            <Button
              type="button"
              block
              color="primary"
              customColor={this.props.isTriggerExceeded ? 'red' : ''}
              onClick={this.props.handleSubmitExceeded.bind(this)}
            >
              {this.props.isTriggerExceeded
                ? 'CANCEL TRIGGER EXCEEDED'
                : 'TRIGGER EXCEEDED'}
            </Button>
          </Col>
        </Row>
        {this.props.isSampling && (
          <div>
            <Clearfix height={16} />
            <Row>
              <Col>
                <LevelLayout>
                  <LoaderCircle />
                  <Clearfix width={10} />
                  <span> Sampling ...</span>
                </LevelLayout>
              </Col>
            </Row>
          </div>
        )}
      </form>
    )
  }
}
