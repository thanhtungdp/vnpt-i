import React, { PureComponent } from 'react'
import PageContainer from 'layout/default-sidebar-layout/PageContainer'
import CarForm from '../car-form'
import Icon from 'themes/icon'
import swal from 'sweetalert2'
import { createCars } from 'api/CarApi'
import slug from 'constants/slug'

export default class CarCreate extends PureComponent {
    static propTypes = {}
    state = {
        submitting: false
    }

    async onSubmit(values) {
        this.setState({ submitting: true })

        const car = await createCars({
            code: values.code,
            truckLoad: values.truckLoad,
            type: values.type.value,
            description: values.description,
            organization: values.organization
        })

        if (!car || car.error) {
            swal({
                title: car.message
            })
        } else {
            swal({
                title: 'Create car Successfull'
            })
            this.props.history.push(slug.car.base)
        }

        this.setState({ submitting: false })
    }

    render() {
        return (
            <PageContainer icon={Icon.create} title="Tạo mới xe">
                <CarForm onSubmit={this.onSubmit}
                    submitting={this.state.submitting}
                />
            </PageContainer>
        )
    }
}
