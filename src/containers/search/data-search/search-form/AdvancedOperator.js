import React from 'react'
import { autobind } from 'core-decorators'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { Field } from 'redux-form'
import { Row, Col, Collapse, InputNumber, Button } from 'antd'
import createLang from 'hoc/create-lang'
import createValidateComponent from 'components/elements/redux-form-validate'
import SelectAnt from 'components/elements/select-ant'
import Clearfix from 'components/elements/clearfix'

const FSelectAnt = createValidateComponent(SelectAnt)
const FInputNumber = createValidateComponent(InputNumber)

const operators = [
  { value: '>', name: '>' },
  { value: '>=', name: '>=' },
  { value: '<', name: '<' },
  { value: '<=', name: '<=' },
  { value: '=', name: '=' }
]

const Wrapper = styled.div`
  position: relative;
`

const ButtonAbsolute = styled.div`
  position: absolute;
  top: 8px;
  right: 16px;
  z-index: 3;
`

@createLang
@autobind
export default class AdvancedOperator extends React.PureComponent {
  static propTypes = {
    measuringList: PropTypes.array,
    onReset: PropTypes.func
  }

  render() {
    const t = this.props.lang.createNameSpace('dataSearchFrom.form')
    return (
      <Wrapper>
        <ButtonAbsolute>
          <Button type="button" onClick={this.props.onReset}>
            {t('advanced.reset')}
          </Button>
        </ButtonAbsolute>
        <Collapse>
          <Collapse.Panel
            header={<strong>{t('advanced.label')}</strong>}
            key="1"
          >
            {[1, 2, 3].map((measuring, index) => (
              <div key={index}>
                <Row gutter={10}>
                  <Col span={10}>
                    <Field
                      label={t('measuringList.label')}
                      name={`advanced[${index}].measuringKey`}
                      size="large"
                      showSearch
                      options={this.props.measuringList}
                      component={FSelectAnt}
                    />
                  </Col>
                  <Col span={10}>
                    <Field
                      label={t('operator.label')}
                      name={`advanced[${index}].operator`}
                      size="large"
                      showSearch
                      options={operators}
                      component={FSelectAnt}
                    />
                  </Col>
                  <Col span={4}>
                    <Field
                      label={t('value.label')}
                      name={`advanced[${index}].value`}
                      size="large"
                      style={{
                        width: '100%'
                      }}
                      component={FInputNumber}
                    />
                  </Col>
                </Row>
                <Clearfix height={16} />
              </div>
            ))}
          </Collapse.Panel>
        </Collapse>
      </Wrapper>
    )
  }
}
