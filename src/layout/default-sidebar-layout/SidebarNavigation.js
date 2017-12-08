import PropTypes from 'prop-types'
import React, { PureComponent } from 'react'

import AddItem from '@atlaskit/icon/glyph/editor/add'
import ArrowLeftIcon from '@atlaskit/icon/glyph/arrow-left'
import Tooltip from '@atlaskit/tooltip'
import MediaServicesBlurIcon from '@atlaskit/icon/glyph/media-services/blur'
import { withRouter } from 'react-router-dom'

import Navigation, {
  AkContainerTitle,
  AkNavigationItem,
  AkContainerNavigationNested,
  createGlobalTheme
} from '@atlaskit/navigation'
import Logo from './Logo'
import Color from '../../themes/color'
import styled from 'styled-components'

import navigationRouterStack
  from '../../navigation/sidebarNavigation/mainNavigationRouter'
import { getIndexLocationWithNavigationRouter } from 'utils/sidebarNavigation'

const WrapperTitle = styled.div`
  margin-left: -8px;
  margin-right: -8px;
`

// const globalTheme = createGlobalTheme('#ffffff', Color.PRIMARY)

@withRouter
export default class BasicNestedNavigation extends React.Component {
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

  shouldComponentUpdate(nextProps, nextState) {
    return (
      this.props.location.pathname !== nextProps.location.pathname ||
      this.state.stack.length !== nextState.stack.length
    )
  }

  getContainerHeaderComponent = () => {
    const backButton = this.state.stack.length > 1
      ? <AkNavigationItem
          icon={<ArrowLeftIcon label="Back" />}
          onClick={() => this.stackPop()}
          text="Back"
          key="2"
        />
      : null

    /* eslint-disable jsx-a11y/no-static-element-interactions */
    return [
      <Tooltip
        key="1"
        position="right"
        content="Hệ thống quản lý chất thải rắn"
      >
        <WrapperTitle>
          <AkContainerTitle
            href="#foo"
            icon={<MediaServicesBlurIcon label="" size="large" />}
            text="SCM Manager"
            subText="Quản lý chất thải rắn"
          />
        </WrapperTitle>
      </Tooltip>,
      backButton
    ]
    /* eslint-enable jsx-a11y/no-static-element-interactions */
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

  renderItem(item) {
    const navigationIndex = getIndexLocationWithNavigationRouter(
      this.props.location,
      navigationRouterStack
    )
    const onClick = item.childMenu
      ? () => this.stackPush(item.childMenu)
      : () => console.log(`Link item clicked: '${item.component.props.text}'`)
    const text = item.component.props.text
    return React.cloneElement(item.component, {
      key: text,
      onClick,
      isSelected: item.url === this.props.location.pathname ||
        // check navigation parent index
        (navigationIndex > -1
          ? navigationRouterStack[navigationIndex].component.props.text === text
          : false)
    })
  }

  renderStack() {
    return this.state.stack.map(page => page.map(item => this.renderItem(item)))
  }

  render() {
    return (
      <Navigation
        globalPrimaryIcon={<Logo />}
        containerHeaderComponent={() => this.getContainerHeaderComponent()}
        globalCreateIcon={<AddItem label="Create" />}
      >
        <AkContainerNavigationNested stack={this.renderStack()} />
      </Navigation>
    )
  }
}
