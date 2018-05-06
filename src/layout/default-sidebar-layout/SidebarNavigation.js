import PropTypes from 'prop-types'
import React from 'react'
import { withRouter } from 'react-router-dom'
import { autobind } from 'core-decorators'
import { AkContainerNavigationNested } from '@atlaskit/navigation'
import { getIndexLocationWithNavigationRouter } from 'utils/sidebarNavigation'
import navigationRouterStack from 'navigation/sidebarNavigation/mainNavigationRouter'
import NavigationLayout from '../navigation-layout'

@withRouter
@autobind
export default class DefaultSidebarNavigation extends React.PureComponent {
  static propTypes = {
    withtootips: PropTypes.bool
  }

  constructor(props) {
    super(props)
    this.state = {
      stack: props.location.pathname
        ? this.getStackInitial(props)
        : [navigationRouterStack]
    }
  }

  getStackInitial(props) {
    const navigationIndex = getIndexLocationWithNavigationRouter(
      props.location,
      navigationRouterStack
    )
    if (
      navigationIndex > -1 &&
      navigationRouterStack[navigationIndex].childMenu
    ) {
      return [
        navigationRouterStack,
        navigationRouterStack[navigationIndex].childMenu
      ]
    }
    return [navigationRouterStack]
  }

  // shouldComponentUpdate(nextProps, nextState) {
  //   return (
  //     this.props.location.pathname !== nextProps.location.pathname ||
  //     this.state.stack.length !== nextState.stack.length ||
  //     this.props.navigation.isOpen !== nextProps.navigation.isOpen ||
  //     this.props.navigation.width !== nextProps.navigation.width
  //   )
  // }

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

  renderItem(item) {
    const navigationIndex = getIndexLocationWithNavigationRouter(
      this.props.location,
      navigationRouterStack
    )
    const onClick = item.childMenu
      ? () => this.stackPush(item.childMenu)
      : () => console.log(`Link item clicked: '${item.component.props.text}'`)
    const text = item.component.props.text
    const itemHref = item.component.props.href ? item.component.props.href : ''
    const pathname = this.props.location.pathname
    const isSelected =
      item.url === pathname ||
      (pathname !== '/' &&
        pathname.indexOf(itemHref) > -1 &&
        itemHref !== '/') ||
      // check navigation parent index
      (navigationIndex > -1
        ? navigationRouterStack[navigationIndex].component.props.text === text
        : false)
    //        (pathname !== '/' && pathname.indexOf(itemHref) > -1)
    // console.log(itemHref + ' vs ' + pathname)
    // console.log(isSelected)
    return React.cloneElement(item.component, {
      key: text,
      onClick,
      isSelected: isSelected
    })
  }

  renderStack() {
    return this.state.stack.map(page => page.map(item => this.renderItem(item)))
  }

  render() {
    return (
      <NavigationLayout
        onChangeSize={this.props.onChangeSize}
        isShowBack={this.state.stack.length > 1}
        onBack={this.stackPop}
        navigation={this.props.navigation}
      >
        <AkContainerNavigationNested stack={this.renderStack()} />
      </NavigationLayout>
    )
  }
}
