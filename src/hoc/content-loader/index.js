import React from 'react'
import styled from 'styled-components'

class PlaceholderComponentRow extends React.Component {
  shouldComponentUpdate() {
    return false
  }

  render() {
    return (
      <div className="row">
        {this.props.items.map((item, index) => (
          <div key={item.key} className={`col-md-${this.props.colSize}`}>
            {this.props.children}
          </div>
        ))}
      </div>
    )
  }
}

const GridWrapper = styled.div`
  display: flex;
  flex-direction: column;
`
const Clearfix = styled.div`
  height: 16px;
`

class PlaceholderComponentColumn extends React.Component {
  shouldComponentUpdate() {
    return false
  }

  render() {
    return (
      <GridWrapper>
        {this.props.items.map((item, index) => (
          <div key={item.key}>
            {this.props.children}
            <Clearfix />
          </div>
        ))}
      </GridWrapper>
    )
  }
}

const createContentLoader = ({
  component,
  items,
  propName = 'placeholder',
  colSize = 12,
  type = 'row'
}) => Component => {
  return class SliderContentLoader extends React.PureComponent {
    getColSize() {
      return 12 / items
    }

    getItemsLength() {
      let newItems = []
      for (let i = 0; i < items; i++) {
        newItems = [
          ...newItems,
          {
            key: i
          }
        ]
      }
      return newItems
    }

    getPlaceholderComponent() {
      const ComponentList =
        type === 'row' ? PlaceholderComponentRow : PlaceholderComponentColumn
      return (
        <ComponentList
          colSize={colSize || this.getColSize()}
          items={this.getItemsLength()}
        >
          {component}
        </ComponentList>
      )
    }

    render() {
      const props = {
        [propName]: this.getPlaceholderComponent(),
        ...this.props
      }
      if (Component) {
        return <Component {...props} />
      } else {
        return <div>{this.getPlaceholderComponent()}</div>
      }
    }
  }
}

export default createContentLoader
