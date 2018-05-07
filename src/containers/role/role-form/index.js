import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { autobind } from 'core-decorators'
import { Row, Col } from 'reactstrap'
import { reduxForm, Field } from 'redux-form'
import createValidateComponent from 'components/elements/redux-form-validate/index'
import InputLabel from 'components/elements/input-label/index'
import CheckBoxRole from 'components/elements/checkbox-role'
import Button from 'components/elements/button/index'
import Clearfix from 'components/elements/clearfix/index'
import createLanguage, { langPropTypes } from 'hoc/create-lang'
import RoleTableCheck from './role-table-check'

const FInputLabel = createValidateComponent(InputLabel)
const FCheckBoxRole = createValidateComponent(CheckBoxRole)
const FRoleTableCheck = createValidateComponent(RoleTableCheck)

function validate(values) {
  const errors = {}
  if (!values.name) {
    errors.name = 'Required'
  } else if (values.name.length < 5) {
    errors.name = 'Must be 5 characters or more'
  }
  return errors
}

@createLanguage
@reduxForm({
  form: 'RoleForm',
  validate
})
@autobind
export default class RoleForm extends PureComponent {
  static propTypes = {
    lang: langPropTypes,
    onSubmit: PropTypes.func,
    isEdit: PropTypes.bool
  }

  render() {
    const { lang: { t } } = this.props
    return (
      <form onSubmit={this.props.handleSubmit(this.props.onSubmit.bind(this))}>
        <Row>
          <Col>
            <Field
              name="name"
              label={t('Role.form.name.label')}
              component={FInputLabel}
            />
          </Col>
        </Row>
        <Clearfix height={16} />
        <Row>
          <Col>
            <Field
              name="description"
              label={t('Role.form.description.label')}
              component={FInputLabel}
            />
          </Col>
        </Row>
        <Clearfix height={16} />
        <Field name="menu" component={FRoleTableCheck} />
        <Row>
          <Col>
            <Field name="menu" component={FCheckBoxRole} />
          </Col>
        </Row>
        <Clearfix height={16} />
        <Button
          type="submit"
          block
          color="primary"
          disabled={this.props.submitting}
          isLoading={this.props.submitting}
        >
          {this.props.isEdit ? t('form.update') : t('form.save')}
        </Button>
      </form>
    )
  }
}
