import PropTypes from 'prop-types'
import React from 'react'

import { autobind } from 'core-decorators'
import ArrowLeftIcon from '@atlaskit/icon/glyph/arrow-left'
import Tooltip from '@atlaskit/tooltip'
import { withRouter } from 'react-router-dom'
import AvatarCharacter from 'components/elements/avatar-character'
import Link from 'components/elements/link'
import slug from 'constants/slug'
import StyleWrapper from './StyleWrapper'
import LogoSubIcon from './LogoSubIcon'
import DocumentIcon from '@atlaskit/icon/glyph/question-circle'
import AppIcon from '@atlaskit/icon/glyph/media-services/grid'
import DocumentDrawer from './DocumentDrawer'
import AppDrawer from './AppDrawer'
import ChangeLanguage from './ChangeLanguage'
import LogoBrandName from './LogoBrandName'
import { translate } from 'hoc/create-lang'

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
    onChangeSize: PropTypes.func,
    logout: PropTypes.func,
    navigation: PropTypes.object
  }

  static defaultProps = {
    navigation: {
      isOpen: true,
      width: 280
    }
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
    if (!this.props.navigation.isOpen) return []
    return [
      <Tooltip key="1" position="right" content="Admin system">
        <WrapperTitle>
          <Link to="/">
            <LogoBrandName />
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
  handleSecurity() {
    this.props.history.push(slug.user.security)
  }
  globalSecondaryActions() {
    return [
      <AkDropdownMenu
        appearance="tall"
        position="right bottom"
        trigger={
          <AkGlobalItem>
            <Tooltip position="right" content={translate('profileUser.title')}>
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
          <DropdownItem onClick={this.handleProfile}>
            {translate('profileUser.viewProfile')}
          </DropdownItem>
          <DropdownItem onClick={this.handleChangePassword}>
            {translate('profileUser.changePassword')}
          </DropdownItem>
          <DropdownItem onClick={this.handleSecurity}>
            {translate('profileUser.security')}
          </DropdownItem>
          <DropdownItem onClick={this.handleLogout}>
            {translate('profileUser.logOut')}
          </DropdownItem>
        </DropdownItemGroup>
      </AkDropdownMenu>,
      <ChangeLanguage />
    ]
  }

  handleResize(e) {
    if (this.props.onChangeSize) {
      this.props.onChangeSize(e)
    }
  }

  renderDrawer(Component, key) {
    return (
      <Component
        key={key}
        onBackButton={() => this.toggleDrawer(key)}
        isOpen={this.state.drawers[key] ? true : false}
        primaryIcon={<span />}
      />
    )
  }

  renderIconDrawer(IconComponent, key, content) {
    return (
      <AkGlobalItem size="medium" onClick={() => this.toggleDrawer(key)}>
        <Tooltip position="right" content={content}>
          <IconComponent
            label={content}
            secondaryColor="inherit"
            size="medium"
          />
        </Tooltip>
      </AkGlobalItem>
    )
  }

  render() {
    return (
      <StyleWrapper>
        <Navigation
          globalTheme={globalTheme}
          width={this.props.hide ? 0 : this.props.navigation.width}
          globalPrimaryIcon={<LogoSubIcon />}
          containerHeaderComponent={() => this.getContainerHeaderComponent()}
          onResize={this.handleResize}
          isOpen={this.props.navigation.isOpen}
          drawers={[
            this.renderDrawer(DocumentDrawer, 'document'),
            this.renderDrawer(AppDrawer, 'app')
          ]}
          globalPrimaryActions={[
            this.renderIconDrawer(DocumentIcon, 'document', 'Document'),
            this.renderIconDrawer(AppIcon, 'app', 'Other Apps')
          ]}
          globalSecondaryActions={this.globalSecondaryActions()}
        >
          {this.props.children}
        </Navigation>
      </StyleWrapper>
    )
  }
}
