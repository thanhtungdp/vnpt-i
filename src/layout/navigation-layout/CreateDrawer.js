// @flow
import React, { PureComponent } from 'react'
import {
  AkCreateDrawer,
  AkNavigationItem,
  AkNavigationItemGroup
} from '@atlaskit/navigation'
import ArrowLeftIcon from '@atlaskit/icon/glyph/arrow-left'
import Icon from 'themes/icon'
import slug from 'constants/slug'
import { WrapperLinkComponent } from 'utils/sidebarNavigation'

export default class CreateDrawer extends PureComponent {
  render() {
    return (
      <AkCreateDrawer
        heading={null}
        key="drawler"
        backIcon={<ArrowLeftIcon label="" />}
        primaryIcon={<ArrowLeftIcon label="" />}
        {...this.props}
      >
        <div key="drawler" style={{ marginTop: -64 }}>
          <AkNavigationItemGroup title="Thêm cấu hình">
            <AkNavigationItem
              href={slug.measuring.create}
              linkComponent={WrapperLinkComponent}
              onClick={this.props.onBackButton}
              icon={Icon.car}
              text="Tạo mới"
            />
          </AkNavigationItemGroup>
        </div>
      </AkCreateDrawer>
    )
  }
}
