import React from 'react'
import { FormFeedback } from 'reactstrap'
import styled from 'styled-components'
import { isStateless } from 'utils'
import Label from '../label'

function getChildrenColor(props) {
  let defaultColor = ''
  if (props.isError) defaultColor = '#e74c3c'
  if (props.isWarning) defaultColor = '#e67e22'
  if (!defaultColor) return ''
  return `
    .form-control{
      border-color: ${defaultColor} !important;
    }
    .input-group{
      border-color: ${defaultColor};
    }
    .form-control-feedback{
      color: ${defaultColor};
    }
    .input-group .input-group-addon{
      background-color: transparent;
      color: ${defaultColor}
    }
  `
}

const View = styled.div`
  .form-control-feedback {
    font-size: 14px;
  }
  ${props => getChildrenColor(props)};
  .ant-select {
    display: block;
  }
`

export default function createValidateComponent(InputComponent) {
  return class ValidateComponent extends React.Component {
    getInputRef() {
      return this.inputRef
    }

    render() {
      const { input, meta, label, ...otherProps } = this.props
      const refProps = !isStateless(InputComponent)
        ? {
            ref: ref => (this.inputRef = ref)
          }
        : {}
      return (
        <View
          isError={meta.touched && meta.error}
          isWarning={meta.touched && meta.warning}
        >
          {label ? (
            <Label style={{ display: 'block' }}>{this.props.label}</Label>
          ) : null}
          <InputComponent {...input} {...otherProps} {...refProps} />
          {meta.touched &&
            meta.error && <FormFeedback>{meta.error}</FormFeedback>}
          {meta.touched &&
            meta.warning && <FormFeedback>{meta.warning}</FormFeedback>}
        </View>
      )
    }
  }
}
