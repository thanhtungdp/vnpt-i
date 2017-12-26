import React,{PureComponent} from 'react'
import { reduxForm, Field } from 'redux-form'
import PropTypes from 'prop-types'
import createValidateComponent from 'components/elements/redux-form-validate'
import InputLabel from 'components/elements/input-label'
import SingleSelect from 'components/elements/single-select'
import Button from '@atlaskit/button'

import Clearfix from 'components/elements/clearfix'
import categoriesType from 'constants/categoriesType'

import CategoriesApi from 'api/CategoriesApi'

const FInputLabel = createValidateComponent(InputLabel)
const FSelect = createValidateComponent(SingleSelect)

function validate(values){
  const min = 4
  const errors = {};
  if(!values.code){
    errors.code = "Required"
  }else if (values.code.length < min){
    errors.code = "Must be "+ min +" characters or more"
  }

  if(values.name && values.name.length < min){
    errors.name = "Must be "+ min +" characters or more"
  }

  return errors;
}

@reduxForm({
  form: 'categoriesForm',
  validate: validate,
})


export default class categoriesForm extends PureComponent{
  static propTypes = {
  }

  state = {
    dataParent: []
  }
  async componentWillMount() {
    const res = await CategoriesApi.getCategories({ itemPerPage : 1000, page : 1 })
    const dataTemp =[{
      heading: "Type",
      items: []
    }]

    res.data.map((record)=>
      dataTemp[0].items.push(
        {content:record.name+"-"+record.code,value:record.code}
      )
    )

    this.setState({
      dataParent: [dataTemp[0]]
    })
  }

  render(){
    return (
      <form onSubmit={this.props.handleSubmit(this.props.onSubmit)} >
        <Field name="type" component={FSelect}  label="Type" dataItems={categoriesType.dataItems}  />
        <Clearfix height={16}/>
        <Field name="code" label="Code" placeholder="" component={FInputLabel}/>
        <Clearfix height={16}/>
        <Field name="name" label="Name" placeholder="" component={FInputLabel}/>
        <Clearfix height={16}/>
        <Field name="description" label="Description" placeholder=""  component={FInputLabel}/>
        <Clearfix height={16}/>
        {this.state.dataParent.length && <Field name="parentCode" component={FSelect}  label="Parent" dataItems={this.state.dataParent}  />}
        <Clearfix height={16}/>
        <Button type="submit" appearance="primary">Lưu lại</Button>
      </form>
    )
  }
}