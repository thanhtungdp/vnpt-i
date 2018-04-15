import PropTypes from 'prop-types'
import React from 'react'

import { autobind } from 'core-decorators'
import AddItem from '@atlaskit/icon/glyph/editor/add'
import ArrowLeftIcon from '@atlaskit/icon/glyph/arrow-left'
import Tooltip from '@atlaskit/tooltip'
import { withRouter } from 'react-router-dom'
import AvatarCharacter from 'components/elements/avatar-character'
import Link from 'components/elements/link'
import slug from 'constants/slug'
import StyleWrapper from './StyleWrapper'
import Logo from './Logo'
import LogoSubIcon from './LogoSubIcon'
import CreateDrawer from './CreateDrawer'
import ChangeLanguage from './ChangeLanguage'

import Navigation, {
// AkContainerTitle,
  AkNavigationItem,
  AkGlobalItem,
  createGlobalTheme
} from '@atlaskit/navigation'
import AkDropdownMenu, {
  DropdownItemGroup,
  DropdownItem
} from '@atlaskit/dropdown-menu'
import styled from 'styled-components'
import { connectAutoDispatch } from 'redux/connect'
import { logout } from 'redux/actions/authAction'

const WrapperTitle = styled.div`
  margin-left: -8px;
  margin-right: -8px;
`

const globalTheme = createGlobalTheme('#ffffff', '#1d89ce')

@connectAutoDispatch(
  state => ({
    authInfo: state.auth.userInfo
  }),
  { logout }
)
@withRouter
@autobind
export default class BasicNestedNavigation extends React.Component {
  static propTypes = {
    isShowBack: PropTypes.bool,
    hide: PropTypes.bool,
    onBack: PropTypes.func,
    logout: PropTypes.func
  }

  state = {
    drawers: {
      create: false
    }
  }

  toggleDrawer(type) {
    this.setState({
      drawers: {
        ...this.state.drawers,
        [type]: !this.state.drawers[type]
      }
    })
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
      <Tooltip key="1" position="right" content="Admin system">
        <WrapperTitle>
          <Link to="/">
            <Logo src="/images/logo/logo-text-icon.png" />
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

  handleChangePassword() {
    this.props.history.push(slug.user.changePassword)
  }

  handleProfile() {
    this.props.history.push(slug.user.profile)
  }

  globalSecondaryActions() {
    return [
      <AkDropdownMenu
        appearance="tall"
        position="right bottom"
        trigger={
          <AkGlobalItem>
            <Tooltip position="right" content="User profile">
              <AvatarCharacter
                size={32}
                username={this.props.authInfo.email}
                avatarUrl={this.props.authInfo.avatar}
              />
            </Tooltip>
          </AkGlobalItem>
        }
      >
        <DropdownItemGroup
          title={`${this.props.authInfo.lastName} ${
            this.props.authInfo.firstName
          }`}
        >
          <DropdownItem onClick={this.handleProfile}>View profile</DropdownItem>
          <DropdownItem>Integrations</DropdownItem>
          <DropdownItem>Bitbucket labs</DropdownItem>
          <DropdownItem onClick={this.handleChangePassword}>
            Change password
          </DropdownItem>
          <DropdownItem onClick={this.handleLogout}>Log out</DropdownItem>
        </DropdownItemGroup>
      </AkDropdownMenu>,
      <ChangeLanguage />
    ]
  }

  render() {
    return (
      <StyleWrapper>
        <Navigation
          globalTheme={globalTheme}
          width={this.props.hide ? 0 : 320}
          globalPrimaryIcon={<LogoSubIcon />}
          containerHeaderComponent={() => this.getContainerHeaderComponent()}
          drawers={[
            <CreateDrawer
              key="create"
              onBackButton={() => this.toggleDrawer('create')}
              isOpen={this.state.drawers.create}
            />
          ]}
          globalPrimaryActions={[
            <AkGlobalItem
              size="medium"
              onClick={() => this.toggleDrawer('create')}
            >
              <Tooltip position="right" content="Create">
                <AddItem
                  label="Create icon"
                  secondaryColor="inherit"
                  size="medium"
                />
              </Tooltip>
            </AkGlobalItem>
          ]}
          globalSecondaryActions={this.globalSecondaryActions()}
        >
          {this.props.children}
        </Navigation>
      </StyleWrapper>
    )
  }
}
