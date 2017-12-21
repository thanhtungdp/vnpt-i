import PropTypes from 'prop-types'
import React from 'react'

import { autobind } from 'core-decorators'
import AddItem from '@atlaskit/icon/glyph/editor/add'
import ArrowLeftIcon from '@atlaskit/icon/glyph/arrow-left'
import Tooltip from '@atlaskit/tooltip'
import MediaServicesBlurIcon from '@atlaskit/icon/glyph/media-services/blur'
import { withRouter } from 'react-router-dom'
import AvatarCharacter from 'components/elements/avatar-character'
import Link from 'components/elements/link'

import Navigation, {
  AkContainerTitle,
  AkNavigationItem,
  createGlobalTheme,
  AkGlobalItem
} from '@atlaskit/navigation'
import AkDropdownMenu, {
  DropdownItemGroup,
  DropdownItem
} from '@atlaskit/dropdown-menu'
import styled from 'styled-components'
import { connectAutoDispatch } from 'redux/connect'
import { logout } from 'redux/actions/authAction'

import Logo from './Logo'
import Color from '../../themes/color'

const WrapperTitle = styled.div`
  margin-left: -8px;
  margin-right: -8px;
`

const globalTheme = createGlobalTheme('#ffffff', Color.PRIMARY)

@connectAutoDispatch(() => ({}), { logout })
@withRouter
@autobind
export default class BasicNestedNavigation extends React.Component {
  static propTypes = {
    isShowBack: PropTypes.bool,
    onBack: PropTypes.func,
    logout: PropTypes.func
  }

  getContainerHeaderComponent = () => {
    const backButton = this.props.isShowBack ? (
      <AkNavigationItem
        icon={<ArrowLeftIcon label="Back" />}
        onClick={this.props.onBack}
        text="Back"
        key="2"
      />
    ) : null

    /* eslint-disable jsx-a11y/no-static-element-interactions */
    return [
      <Tooltip
        key="1"
        position="right"
        content="Hệ thống quản lý chất thải rắn"
      >
        <WrapperTitle>
          <Link to="/">
            <AkContainerTitle
              icon={<MediaServicesBlurIcon label="" size="large" />}
              text="SCM Manager"
              subText="Quản lý chất thải rắn"
            />
          </Link>
        </WrapperTitle>
      </Tooltip>,
      backButton
    ]
    /* eslint-enable jsx-a11y/no-static-element-interactions */
  }

  handleLogout() {
    this.props.logout()
    this.props.history.push('/login')
  }

  globalSecondaryActions() {
    return [
      <AkDropdownMenu
        appearance="tall"
        position="right bottom"
        trigger={
          <AkGlobalItem>
            <Tooltip position="right" content="User profile">
              <AvatarCharacter size={32} username="thanhtungdp" />
            </Tooltip>
          </AkGlobalItem>
        }
      >
        <DropdownItemGroup title="Luke Skywalker">
          <DropdownItem>View profile</DropdownItem>
          <DropdownItem>Integrations</DropdownItem>
          <DropdownItem>Bitbucket labs</DropdownItem>
          <DropdownItem onClick={this.handleLogout}>Log out</DropdownItem>
        </DropdownItemGroup>
      </AkDropdownMenu>
    ]
  }

  render() {
    return (
      <Navigation
        globalTheme={globalTheme}
        globalPrimaryIcon={<Logo />}
        containerHeaderComponent={() => this.getContainerHeaderComponent()}
        globalCreateIcon={<AddItem label="Create" />}
        globalSecondaryActions={this.globalSecondaryActions()}
      >
        {this.props.children}
      </Navigation>
    )
  }
}
