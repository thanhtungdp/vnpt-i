import React, { PureComponent } from 'react'
import { StatelessSelect } from '@atlaskit/single-select'
import PropTypes from 'prop-types'
import CarApi from 'api/CarApi'

export default class SelectBoxCar extends PureComponent {
  static propTypes = {
    query: PropTypes.object
  }

  state = {
    isOpen: false,
    filterValue: '',
    selectItems: []
  }

  onSelected = item => {
    this.setState(
      {
        isOpen: false,
        selectedItem: item,
        filterValue: ''
      },
      () => {
        this.props.onChange(item)
      }
    )
  }

  toggleOpen = ({ isOpen }) => this.setState({ isOpen })
  updateFilter = filterValue => this.setState({ filterValue })

  async loatDataWithOrganization(organization) {
    let query = {}
    if (organization) query._id = organization._id
    const carRes = await CarApi.getListByOrganization(query)
    const carItems = carRes.data.map(object => ({
      content: object.code,
      value: object.code,
      _id: object._id,
      code: object.code,
      truckLoad: object.truckLoad,
      type: object.type,
      description: object.description,
      organization: object.organization
    }))
    this.setState({
      selectItems: [{ items: carItems }],
      selectedItem: {},
      filterValue: ''
    })
    return this.state.selectedItem
  }

  async componentDidMount() {
    let query = {}
    const carRes = await CarApi.getCarsFilter(query)
    const carItems = carRes.data.map(object => ({
      content: object.code,
      value: object.code,
      _id: object._id,
      code: object.code,
      truckLoad: object.truckLoad,
      type: object.type,
      description: object.description,
      organization: object.organization
    }))
    this.setState({ selectItems: [{ items: carItems }] })
  }

  getRealValue() {
    if (
      typeof this.props.value === 'string' &&
      this.state.selectItems.length > 0
    ) {
      return this.state.selectItems[0].items.find(
        i => i.value === this.props.value
      )
    }
    return this.props.value
  }

  render() {
    return (
      <StatelessSelect
        placeholder="Choose a Car"
        items={this.state.selectItems}
        noMatchesFound="Empty items"
        hasAutocomplete
        defaultSelected={this.getRealValue()}
        isOpen={this.state.isOpen}
        onOpenChange={this.toggleOpen}
        onFilterChange={this.updateFilter}
        filterValue={this.state.filterValue}
        selectedItem={this.state.selectedItem}
        onSelected={this.onSelected}
        {...this.props}
      />
    )
  }
}
