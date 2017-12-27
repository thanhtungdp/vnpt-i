import React from 'react'
import { FormFeedback } from 'reactstrap'
import styled from 'styled-components'

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
`

function ReduxFormValidate({ input, meta, componentChildren, ...otherProps }) {
  const Input = componentChildren
  return (
    <View
      isError={meta.touched && meta.error}
      isWarning={meta.touched && meta.warning}
    >
      <Input {...input} {...otherProps} />
      {meta.touched && meta.error && <FormFeedback>{meta.error}</FormFeedback>}
      {meta.touched &&
        meta.warning && <FormFeedback>{meta.warning}</FormFeedback>}
    </View>
  )
}

export default function createValidateComponent(Component) {
  return props => <ReduxFormValidate componentChildren={Component} {...props} />
}
