import React from 'react'
import PropTypes from 'prop-types'
import { StatelessSelect } from '@atlaskit/single-select'
import { autobind } from 'core-decorators'
import styled from 'styled-components'
import Label from '../label'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  .crdjFp,
  .jGirHg {
    display: block;
  }
`

@autobind
export default class SingleSelectCustom extends React.PureComponent {
  static propTypes = {
    onChange: PropTypes.func,
    value: PropTypes.any,
    dataItems: PropTypes.arrayOf(
      PropTypes.shape({
        heading: PropTypes.string,
        items: PropTypes.arrayOf(PropTypes.object)
      })
    )
  }

  state = {
    isOpen: false,
    filterValue: ''
  }

  toggleOpen({ isOpen }) {
    this.setState({ isOpen })
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
        {this.props.label && <Label>{this.props.label}</Label>}
        <Container>
          <StatelessSelect
            label={null}
            hasAutocomplete={true}
            items={this.props.dataItems == null ? [] : this.props.dataItems}
            droplistShouldFitContainer={
              this.props.droplistShouldFitContainer == null
                ? false
                : this.props.droplistShouldFitContainer
            }
            isOpen={this.state.isOpen}
            onOpenChange={this.toggleOpen}
            onSelected={this.props.onChange}
            defaultSelected={this.getRealValue()}
            selectedItem={this.getRealValue()}
            {...this.props}
          />
        </Container>
      </div>
    )
  }
}
