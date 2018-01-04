import React, { PureComponent } from 'react'
import PageContainer from 'layout/default-sidebar-layout/PageContainer'
import CarForm from '../car-form/index'
import { getOneCars, updateCars } from 'api/CarApi'
import swal from 'sweetalert2'
import Breadcrumb from '../breadcrumb'

export default class CarCreate extends PureComponent {
  state = {
    loaded: false,
    submitting: false,
    formValues: {}
  }
  static propTypes = {}

  async componentDidMount() {
    const code = this.props.match.params.code
    const car = await getOneCars({ code })
    this.setState({
      loaded: true,
      formValues: car
    })
  }

  async onSubmit(values) {
    const car = await updateCars({
      code: values.code,
      truckLoad: values.truckLoad,
      type: typeof values.type === 'object' ? values.type.value : values.type,
      description: values.description,
      organization: values.organization
    })

    if (!car || car.error) {
      swal({
        title: car.message,
        type: 'error'
      })
    } else {
      swal({
        title: 'Update car Successfull',
        type: 'success'
      })
    }
  }

  render() {
    return (
      <PageContainer
        title={
          this.state.formValues.code
            ? this.state.formValues.code
            : 'loading ...'
        }
      >
        <Breadcrumb
          items={[
            'list',
            {
              id: 'edit',
              href: '',
              name: this.state.formValues.code
            }
          ]}
        />
        {this.state.loaded && (
          <CarForm
            isEdit
            initialValues={this.state.formValues}
            onSubmit={this.onSubmit}
          />
        )}
      </PageContainer>
    )
  }
}
