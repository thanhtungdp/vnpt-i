import React, { PureComponent } from 'react'
import SingleSelect from '@atlaskit/single-select'

export default class SelectBoxTypeCar extends PureComponent {
  state = {
    selectItemsType: [
      {
        items: [
          {
            content: 'Rác Sinh Hoạt',
            value: 'RacSinhHoat'
          }
        ]
      }
    ]
  }

  getRealValue() {
    if (
      typeof this.props.value === 'string' &&
      this.state.selectItemsType.length > 0
    ) {
      return this.state.selectItemsType[0].items.find(
        i => i.value === this.props.value
      )
    }
    return this.props.value
  }

  render() {
    return (
      <SingleSelect
        name="type"
        placeholder="Choose a Type"
        noMatchesFound="Empty items"
        items={this.state.selectItemsType}
        onSelected={object => this.props.onChange(object.item)}
        defaultSelected={this.getRealValue()}
        {...this.props}
      />
    )
  }
}
