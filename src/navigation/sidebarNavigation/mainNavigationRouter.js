import React from 'react'
import { AkNavigationItemGroup, AkNavigationItem } from '@atlaskit/navigation'
import styled from 'styled-components'

import { createChildListMenuItem } from '../../utils/sidebarNavigation'
import slug from '../../constants/slug'
import Icon from '../../themes/icon'

const NavigationWrapper = styled.div`
  margin-top: -12px;
`

const groupManagerComponent = {
  component: (
    <NavigationWrapper text="Quản lý nhóm">
      <AkNavigationItemGroup title="Quản lý nhóm" />
    </NavigationWrapper>
  )
}

const mapManagerComponent = {
  component: (
    <AkNavigationItemGroup text="Bản đồ" title="Bản đồ">
      <AkNavigationItem icon={Icon.map} text="Bản đồ vị trí" />
    </AkNavigationItemGroup>
  )
}

const landFillMenu = createChildListMenuItem(
  {
    icon: Icon.landFill,
    text: 'Bãi chôn lấp'
  },
  [
    {
      url: slug.landFill.list,
      icon: Icon.list,
      text: 'Danh sách bãi'
    },
    {
      url: slug.landFill.create,
      icon: Icon.create,
      text: 'Tạo mới bãi'
    }
  ]
)

const transportMenu = createChildListMenuItem(
  {
    icon: Icon.transport,
    text: 'Trạm chung chuyển'
  },
  [
    {
      url: slug.transitStation.list,
      icon: Icon.list,
      text: 'Danh sách trạm'
    },
    {
      url: slug.transitStation.create,
      icon: Icon.create,
      text: 'Tạo mới trạm'
    }
  ]
)

const appointmentMenu = createChildListMenuItem(
  {
    icon: Icon.appointment,
    text: 'Điểm hẹn'
  },
  [
    {
      url: slug.appointment.list,
      icon: Icon.list,
      text: 'Danh sách điểm'
    },
    {
      url: slug.appointment.create,
      icon: Icon.create,
      text: 'Tạo mới điểm'
    }
  ]
)

const directionMenu = createChildListMenuItem(
  {
    icon: Icon.direction,
    text: 'Lộ trình'
  },
  [
    {
      url: slug.appointment.list,
      icon: Icon.list,
      text: 'Danh sách lộ trình'
    },
    {
      url: slug.appointment.create,
      icon: Icon.create,
      text: 'Tạo lộ trình mới'
    }
  ]
)

export default [
  groupManagerComponent,
  landFillMenu,
  transportMenu,
  appointmentMenu,
  directionMenu,
  mapManagerComponent
]
