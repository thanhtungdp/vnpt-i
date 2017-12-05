import PropTypes from 'prop-types'
import React, { PureComponent } from 'react'

import AddItem from '@atlaskit/icon/glyph/editor/add'
import ArrowLeftIcon from '@atlaskit/icon/glyph/arrow-left'
import Tooltip from '@atlaskit/tooltip'
import MediaServicesBlurIcon from '@atlaskit/icon/glyph/media-services/blur'

import Navigation, {
  AkContainerTitle,
  AkNavigationItem,
  AkContainerNavigationNested,
  createGlobalTheme
} from '@atlaskit/navigation'
import Logo from './Logo'
import Color from '../../themes/color'

import navigationRouterStack
  from '../../navigation/sidebarNavigation/mainNavigationRouter'

const globalTheme = createGlobalTheme('#ffffff', Color.PRIMARY)

export default class BasicNestedNavigation extends PureComponent {
  static propTypes = {
    withtootips: PropTypes.bool
  }

  state = {
    stack: [navigationRouterStack],
    isHeaderInlineDialogOpen: false
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
        <AkContainerTitle
          href="#foo"
          icon={<MediaServicesBlurIcon label="" size="large" />}
          text="SCM Manager"
          subText="Hệ thống quản lý chất thải rắn"
        />
      </Tooltip>,
      backButton
    ]
    /* eslint-enable jsx-a11y/no-static-element-interactions */
  }

  stackPush = newPage => {
    const stack = [...this.state.stack, newPage]
    this.setState({ stack })
  }

  stackPop = () => {
    if (this.state.stack.length <= 1) {
      return false
    }

    const stack = this.state.stack.slice(0, this.state.stack.length - 1)
    return this.setState({ stack })
  }

  renderItem = item => {
    const onClick = item.childMenu
      ? () => this.stackPush(item.childMenu)
      : () => console.log(`Link item clicked: '${item.component.props.text}'`)
    const key = item.component.props.text
    return !this.props.withtootips
      ? React.cloneElement(item.component, { key, onClick })
      : <Tooltip content={key} position="right">
          {React.cloneElement(item.component, { key, onClick })}
        </Tooltip>
  }

  renderStack = () => {
    return this.state.stack.map(page => page.map(item => this.renderItem(item)))
  }

  render() {
    return (
      <Navigation
        globalTheme={globalTheme}
        globalPrimaryIcon={<Logo />}
        containerHeaderComponent={() => this.getContainerHeaderComponent()}
        globalCreateIcon={<AddItem label="Create" />}
      >
        <AkContainerNavigationNested
          onAnimationEnd={({ traversalDirection }) =>
            console.log(
              `Transition animation completed: '${traversalDirection}'`
            )}
          stack={this.renderStack()}
        />
      </Navigation>
    )
  }
}
