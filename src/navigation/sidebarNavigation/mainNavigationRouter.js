import React from 'react'
import { AkNavigationItemGroup, AkNavigationItem } from '@atlaskit/navigation'
import styled from 'styled-components'

import {
  // createChildListMenuItem,
  WrapperLinkComponent
} from '../../utils/sidebarNavigation'
import slug from '../../constants/slug'
import Icon from '../../themes/icon'

const NavigationWrapper = styled.div`
  margin-top: -12px;
`

const groupManagerComponent = {
  component: (
    <NavigationWrapper text="Quản lý trạm">
      <AkNavigationItemGroup title="Quản lý trạm" />
    </NavigationWrapper>
  )
}

const groupConfigManagerComponent = {
  component: (
    <NavigationWrapper text="Quản lý cấu hình">
      <AkNavigationItemGroup title="Quản lý cấu hình" />
    </NavigationWrapper>
  )
}

const mapManagerComponent = {
  component: (
    <AkNavigationItemGroup href={slug.map.base} text="Bản đồ" title="Bản đồ">
      <AkNavigationItem
        linkComponent={WrapperLinkComponent}
        href={slug.map.base}
        icon={Icon.map}
        text="Bản đồ vị trí"
      />
    </AkNavigationItemGroup>
  )
}

const appointmentMenu = {
  component: (
    <AkNavigationItem
      linkComponent={WrapperLinkComponent}
      href={slug.staionAppointment.base}
      icon={Icon.appointment}
      text="Điểm hẹn"
    />
  )
}
const directionMenu = {
  component: (
    <AkNavigationItem
      linkComponent={WrapperLinkComponent}
      href={slug.staionAppointment.base}
      icon={Icon.direction}
      text="Lộ trình"
    />
  )
}

const transitMenu = {
  component: (
    <AkNavigationItem
      linkComponent={WrapperLinkComponent}
      href={slug.stationTransit.base}
      icon={Icon.transitStation}
      text="Trạm chung chuyển"
    />
  )
}

const landFillMenu = {
  component: (
    <AkNavigationItem
      linkComponent={WrapperLinkComponent}
      href={slug.landFill.base}
      icon={Icon.landFill}
      text="Bãi chôn lấp"
    />
  )
}

const organizationMenu = {
  component: (
    <AkNavigationItem
      linkComponent={WrapperLinkComponent}
      href={slug.organization.base}
      icon={Icon.organization}
      text="Doanh nghiệp"
    />
  )
}

const categoryMenu = {
  component: (
    <AkNavigationItem
      linkComponent={WrapperLinkComponent}
      href={slug.category.base}
      icon={Icon.category}
      text="Chuyên mục"
    />
  )
}

const carMenu = {
  component: (
    <AkNavigationItem
      linkComponent={WrapperLinkComponent}
      href={slug.car.base}
      icon={Icon.car}
      text="Xe"
    />
  )
}

export default [
  groupConfigManagerComponent,
  categoryMenu,
  organizationMenu,
  carMenu,
  groupManagerComponent,
  landFillMenu,
  transitMenu,
  appointmentMenu,
  directionMenu,
  mapManagerComponent
]
