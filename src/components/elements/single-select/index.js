import React from 'react'
import PropTypes from 'prop-types'
import SingleSelect from '@atlaskit/single-select'
import Label from '../label'
import styled from 'styled-components'

const Container = styled.div`
  display: flex;
  flex-direction: column;
`
export default class SingleSelectCustom extends React.PureComponent {
  static propTypes = {
    onChange: PropTypes.func,
    dataItems: PropTypes.arrayOf(
      PropTypes.shape({
        heading: PropTypes.string,
        items: PropTypes.arrayOf(PropTypes.shape())
      })
    )
  }

  getRealValue() {
    if (this.props.dataItems.length === 0) return {}
    if (typeof this.props.value === 'string') {
      let item = this.props.dataItems[0].items.find(
        item => item.value === this.props.value
      )
      return item
    }
    return this.props.value
  }

  render() {
    return (
      <div style={{ width: '100%', display: 'block' }}>
        <Label>{this.props.label}</Label>
        <Container>
          <SingleSelect
            {...this.props}
            label={null}
            hasAutocomplete={true}
            items={this.props.dataItems == null ? [] : this.props.dataItems}
            droplistShouldFitContainer={
              this.props.droplistShouldFitContainer == null
                ? false
                : this.props.droplistShouldFitContainer
            }
            onSelected={object => this.props.onChange(object.item)}
            defaultSelected={this.getRealValue()}
            selectedItem={this.getRealValue()}
          />
        </Container>
      </div>
    )
  }
}
