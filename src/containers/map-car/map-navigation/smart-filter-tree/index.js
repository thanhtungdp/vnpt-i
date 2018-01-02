import React from 'react'
import { autobind } from 'core-decorators'
import styled from 'styled-components'
import { AkContainerNavigationNested } from '@atlaskit/navigation'
import { AkNavigationItemGroup, AkNavigationItem } from '@atlaskit/navigation'
import PlanFilter from '../plan-filter'
import CarFilter from '../car-filter'

const districtStack = [
  {
    component: <AkNavigationItemGroup title="Lọc theo quận" />
  },
  {
    isDistrict: true,
    component: <AkNavigationItem text="Quận 1">Quận 1</AkNavigationItem>
  },
  {
    isDistrict: true,
    component: <AkNavigationItem text="Quận 2">Quận 2</AkNavigationItem>
  },
  {
    isDistrict: true,
    component: <AkNavigationItem text="Quận 3">Quận 3</AkNavigationItem>
  },
  {
    isDistrict: true,
    component: <AkNavigationItem text="Quận 4">Quận 4</AkNavigationItem>
  },
  {
    isDistrict: true,
    component: <AkNavigationItem text="Quận 5">Quận 5</AkNavigationItem>
  }
]

const filterDeep = [
  {
    component: <PlanFilter>Filter</PlanFilter>
  },
  {
    component: <CarFilter />
  }
]

// const carsChildren = cars.map(car => ({
//   value: car.name,
//   label: car.name,
//   icon: ''
// }))
//
// const plansChildren = [
//   { value: 'Lộ trình ABC', label: 'Lộ trình ABC', icon: '' }
// ]
//
// const districtChildren = [
//   {
//     value: 'car',
//     label: 'Xe',
//     icon: <i className="fa fa-car" />,
//     children: carsChildren
//   },
//   { value: 'plan', label: 'Lộ trình', children: plansChildren }
// ]
//
// const nodes = [
//   {
//     value: 'mars',
//     label: 'Quận',
//     children: [
//       { value: 'quan1', label: 'Quận 1', icon: '', children: districtChildren },
//       { value: 'quan2', label: 'Quận 2', icon: '' },
//       { value: 'quan3', label: 'Quận 3', icon: '' },
//       { value: 'quan4', label: 'Quận 4', icon: '' },
//       { value: 'quan5', label: 'Quận 5', icon: '' },
//       { value: 'quan6', label: 'Quận 6', icon: '' },
//       { value: 'quan7', label: 'Quận 7', icon: '' }
//     ]
//   }
// ]
const SmartFilterTreeWrapper = styled.div``

@autobind
export default class SmartFilterTee extends React.PureComponent {
  state = {
    stack: [districtStack],
    currenText: ''
  }

  stackPush(newPage) {
    const stack = [...this.state.stack, newPage]
    this.setState({ stack })
  }

  stackPop() {
    if (this.state.stack.length <= 1) {
      return false
    }

    const stack = this.state.stack.slice(0, this.state.stack.length - 1)
    return this.setState({ stack })
  }

  handleClickItem(item) {
    if (item.isRoot) {
      this.stackPush(districtStack)
    }
    if (item.isDistrict) {
      this.stackPush(filterDeep)
    }
  }

  renderItem(item) {
    // const navigationIndex = getIndexLocationWithNavigationRouter(
    //   this.props.location,
    //   navigationRouterStack
    // )
    // const onClick = item.childMenu
    //   ? () => this.stackPush(item.childMenu)
    //   : () => console.log(`Link item clicked: '${item.component.props.text}'`)
    const text = item.component.props.text
    return React.cloneElement(item.component, {
      key: text,
      onClick: () => {
        this.setState({ currentText: text })
        this.handleClickItem(item)
      }
    })
  }

  renderStack() {
    return this.state.stack.map(page => page.map(item => this.renderItem(item)))
  }

  render() {
    return (
      <SmartFilterTreeWrapper>
        {this.state.stack.length > 1 && (
          <AkNavigationItem
            isSelected
            onClick={this.stackPop}
            text={this.state.currentText}
          />
        )}
        <AkContainerNavigationNested stack={this.renderStack()} />
      </SmartFilterTreeWrapper>
    )
  }
}
