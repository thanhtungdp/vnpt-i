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
        backIcon={<ArrowLeftIcon label="" />}
        {...this.props}
      >
        <div style={{ marginTop: -64 }}>
          <AkNavigationItemGroup title="Thêm cấu hình">
            <AkNavigationItem
              href={slug.car.create}
              linkComponent={WrapperLinkComponent}
              onClick={this.props.onBackButton}
              icon={Icon.car}
              text="Thêm mới xe"
            />
            <AkNavigationItem
              href={slug.organization.create}
              linkComponent={WrapperLinkComponent}
              onClick={this.props.onBackButton}
              icon={Icon.organization}
              text="Thêm tổ chức"
            />
            <AkNavigationItem
              href={slug.category.create}
              linkComponent={WrapperLinkComponent}
              onClick={this.props.onBackButton}
              icon={Icon.category}
              text="Thêm chuyên mục"
            />
          </AkNavigationItemGroup>
          <AkNavigationItemGroup title="Thêm trạm">
            <AkNavigationItem
              href={slug.landFill.create}
              linkComponent={WrapperLinkComponent}
              onClick={this.props.onBackButton}
              icon={Icon.landFill}
              text="Thêm bãi chôn lấp"
            />
            <AkNavigationItem
              href={slug.stationTransit.create}
              linkComponent={WrapperLinkComponent}
              onClick={this.props.onBackButton}
              icon={Icon.transitStation}
              text="Thêm trạm trung chuyển"
            />
            <AkNavigationItem
              href={slug.appointment.create}
              linkComponent={WrapperLinkComponent}
              onClick={this.props.onBackButton}
              icon={Icon.appointment}
              text="Thêm trạm điểm hẹn"
            />
            <AkNavigationItem
              href={slug.landFill.base}
              linkComponent={WrapperLinkComponent}
              onClick={this.props.onBackButton}
              icon={Icon.direction}
              text="Thêm lộ trình"
            />
          </AkNavigationItemGroup>
        </div>
      </AkCreateDrawer>
    )
  }
}
