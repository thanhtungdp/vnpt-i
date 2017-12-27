import React, { PureComponent } from 'react'
import SingleSelect from '@atlaskit/single-select';
import PropTypes from 'prop-types';
import CarApi from 'api/CarApi'
import SelectBoxOrganization from 'components/elements/select-box-organization'
import SelectBoxCar from 'components/elements/select-box-car'
import Clearfix from 'components/elements/clearfix'
import styled from 'styled-components'
import { autobind } from 'core-decorators'

const View = styled.div`
  display: flex;
`

const Label = styled.label`
  color: rgba(0, 0, 0, .8);
  font-weight: 600;
  font-size: 14px;
`

@autobind
export default class SelectBoxOrganizationAndCar extends PureComponent {
    static propTypes = {
        query: PropTypes.object,
        selectBoxOrganizationName: PropTypes.string,
        selectBoxCarName: PropTypes.string
    };

    state = {
        organization: {},
        car: {}
    }

    async handleChangeOrganization(organization) {
        const car = await this.componentSelectBoxCar.loatDataWithOrganization({ _id: organization._id })
        console.log(car)
        this.setState({ 
            organization,
            car: car
         }, () => {
            this.props.onChange(this.state)
        })
    }

    handleChangeCar(car) {
        this.setState({ car }, () => {
            this.props.onChange(this.state)
        })
    }

    render() {
        return (
            <View>
                <SelectBoxOrganization
                    name={this.props.selectBoxOrganizationName}
                    onChange={this.handleChangeOrganization}
                    query={{}}
                />
                <Clearfix width={24} />
                <SelectBoxCar
                    ref={ref => this.componentSelectBoxCar = ref}
                    name={this.props.selectBoxCarName}
                    onChange={this.handleChangeCar}
                    query={{}}
                />
            </View>
        );
    }
}

