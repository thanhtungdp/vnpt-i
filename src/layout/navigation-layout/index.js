import PropTypes from 'prop-types'
import React from 'react'

import AddItem from '@atlaskit/icon/glyph/editor/add'
import ArrowLeftIcon from '@atlaskit/icon/glyph/arrow-left'
import Tooltip from '@atlaskit/tooltip'
import MediaServicesBlurIcon from '@atlaskit/icon/glyph/media-services/blur'
import { withRouter } from 'react-router-dom'
import Link from 'components/elements/link'

import Navigation, {
  AkContainerTitle,
  AkNavigationItem,
  createGlobalTheme
} from '@atlaskit/navigation'
import Logo from './Logo'
import Color from '../../themes/color'
import styled from 'styled-components'

const WrapperTitle = styled.div`
  margin-left: -8px;
  margin-right: -8px;
`

const globalTheme = createGlobalTheme('#ffffff', Color.PRIMARY)

@withRouter
export default class BasicNestedNavigation extends React.Component {
  static propTypes = {
    isShowBack: PropTypes.bool,
    onBack: PropTypes.func
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

  render() {
    return (
      <Navigation
        globalTheme={globalTheme}
        globalPrimaryIcon={<Logo />}
        containerHeaderComponent={() => this.getContainerHeaderComponent()}
        globalCreateIcon={<AddItem label="Create" />}
      >
        {this.props.children}
      </Navigation>
    )
  }
}
