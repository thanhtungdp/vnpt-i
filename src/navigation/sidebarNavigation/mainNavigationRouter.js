import React from 'react'
import { AkNavigationItemGroup, AkNavigationItem } from '@atlaskit/navigation'
import styled from 'styled-components'

import {
  createChildListMenuItem,
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
const organizationMenu = createChildListMenuItem(
  {
    icon: Icon.organization,
    text: 'Doanh Nghiệp'
  },
  [
    {
      url: slug.organization.list,
      icon: Icon.list,
      text: 'Danh sách Doanh Nghiệp'
    },
    {
      url: slug.organization.create,
      icon: Icon.create,
      text: 'Tạo mới doanh nghiệp'
    }
  ]
)

const carMenu = createChildListMenuItem(
  {
    icon: Icon.car,
    text: 'Xe'
  },
  [
    {
      url: slug.car.list,
      icon: Icon.list,
      text: 'Danh sách Xe'
    },
    {
      url: slug.car.create,
      icon: Icon.create,
      text: 'Tạo mới Xe'
    }
  ]
)
// const organizationMenu = createChildListMenuItem(
//   {
//     icon: Icon.organization,
//     text: 'Doanh Nghiệp'
//   },
//   [
//     {
//       url: slug.organization.list,
//       icon: Icon.list,
//       text: 'Danh sách Doanh Nghiệp'
//     },
//     {
//       url: slug.organization.create,
//       icon: Icon.create,
//       text: 'Tạo mới doanh nghiệp'
//     }
//   ]
// )

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

export default [
  groupManagerComponent,
  landFillMenu,
  transportMenu,
  appointmentMenu,
  directionMenu,
  groupConfigManagerComponent,
  categoryMenu,
  organizationMenu,
  carMenu,
  mapManagerComponent
]
