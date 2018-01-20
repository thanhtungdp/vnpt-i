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

const groupConfirmManager = {
  component: (
    <NavigationWrapper text="Kiểm duyệt">
      <AkNavigationItemGroup title="Quản lý cấu hình" />
    </NavigationWrapper>
  )
}

const quizListsMenu = {
  component: (
    <AkNavigationItem
      linkComponent={WrapperLinkComponent}
      href={slug.quizLists.base}
      icon={Icon.quizLists}
      text="Đề thi"
    />
  )
}

const userManagerMenu = {
  component: (
    <AkNavigationItem
      linkComponent={WrapperLinkComponent}
      href={slug.users.base}
      icon={Icon.users}
      text="Thành viên"
    />
  )
}

const gallerySliderMenu = {
  component: (
    <AkNavigationItem
      linkComponent={WrapperLinkComponent}
      href={slug.gallerySlider.base}
      icon={Icon.gallerySlider}
      text="Gallery slider"
    />
  )
}

export default [
  groupConfirmManager,
  quizListsMenu,
  userManagerMenu,
  gallerySliderMenu
]
