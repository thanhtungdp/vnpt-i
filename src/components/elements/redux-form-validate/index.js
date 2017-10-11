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

export function createValidateComponent(Component) {
  return props => <ReduxFormValidate componentChildren={Component} {...props} />
}

export default function ReduxFormValidate({
  input,
  meta: { touched, error, warning },
  componentChildren,
  ...otherProps
}) {
  const Input = componentChildren
  return (
    <View isError={touched && error} isWarning={touched && warning}>
      <Input {...input} {...otherProps} />
      {touched &&
        error &&
        <FormFeedback>
          {error}
        </FormFeedback>}
      {touched &&
        warning &&
        <FormFeedback>
          {warning}
        </FormFeedback>}
    </View>
  )
}
