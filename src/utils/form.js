import { Form } from 'antd'

export function mapPropsToFields({ initialValues = {} }) {
  const objectValues = {}
  Object.keys(initialValues).forEach(key => {
    objectValues[key] = Form.createFormField({ value: initialValues[key] })
  })
  return objectValues
}
