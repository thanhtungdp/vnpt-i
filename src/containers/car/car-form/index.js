import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'
import { reduxForm, Field } from 'redux-form'
import createValidateComponent from 'components/elements/redux-form-validate'
import InputLabel from 'components/elements/input-label'
import Button from 'components/elements/button'
import Clearfix from 'components/elements/clearfix'
import SelectBoxOrganization from 'components/elements/select-box-organization'
import SelectBoxTypeCar from 'components/elements/select-box-type-car'
import styled from 'styled-components'


const FInputLabel = createValidateComponent(InputLabel)
const FSelectBoxOrganization = createValidateComponent(SelectBoxOrganization)
const FSelectBoxTypeCar = createValidateComponent(SelectBoxTypeCar)

const View = styled.div``

const Label = styled.label`
  color: rgba(0, 0, 0, .8);
  font-weight: 600;
  font-size: 14px;
`

function validate(values) {
    const errors = {}
    if (!values.code) {
        errors.code = 'Required'
    } else if (values.code.length < 4) {
        errors.code = 'Must be 4 characters or more'
    }
    if (!values.organization) errors.organization = 'Required'
    if (!values.type) errors.type = 'Required'
    return errors
}


@reduxForm({
    form: 'carForm',
    validate
})
@withRouter
export default class CarForm extends PureComponent {
    static propTypes = {
        onSubmit: PropTypes.func,
        submitting: PropTypes.bool,
        handleSubmit: PropTypes.func,
        isEdit: PropTypes.bool
    }
    state = {
        organization: '',
        selectItemsType: [{
            items: [{
                content: 'Rác Sinh Hoạt', value: 'RacSinhHoat'
            }]
        }]
    };

    render() {
        return (
            <form onSubmit={this.props.handleSubmit(this.props.onSubmit.bind(this))}>
                <Field
                    name="code"
                    label="Mã xe/Biển số"
                    placeholder="51C212711"
                    readOnly={this.props.isEdit ? "readOnly" : ""}
                    component={FInputLabel}
                />
                <Clearfix height={16} />
                <View>
                    <Label>
                        Doanh Nghiệp
                    </Label>
                    <Field
                        name="organization"
                        component={FSelectBoxOrganization}
                        query={{}}
                    />
                </View>
                <Clearfix height={16} />
                <Field
                    name="truckLoad"
                    label="Trọng tải"
                    placeholder="5 Tấn"
                    component={FInputLabel}
                />
                <Clearfix height={16} />
                <View>
                    <Label>
                        Loại
                    </Label>
                    <Field
                        name="type"
                        component={FSelectBoxTypeCar}
                    />
                </View>
                <Clearfix height={16} />
                <Field
                    name="description"
                    type="textarea"
                    label="Mô tả"
                    placeholder="Mô tả"
                    component={FInputLabel}
                />
                <Clearfix height={16} />
                <Button
                    type="submit"
                    color="primary"
                    block
                    isLoading={this.props.submitting}
                    disabled={this.props.submitting}
                >
                    {this.props.isEdit ? 'Update' : 'Create'}
                </Button>
            </form>
        )
    }
}
