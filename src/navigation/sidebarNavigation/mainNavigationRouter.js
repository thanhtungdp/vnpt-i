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
    <NavigationWrapper text="Manage">
      <AkNavigationItemGroup title="Manage" />
    </NavigationWrapper>
  )
}

const measuringMenu = {
  component: (
    <AkNavigationItem
      linkComponent={WrapperLinkComponent}
      href={slug.measuring.base}
      icon={Icon.quizLists}
      text="Measuring"
    />
  )
}

const stationTypeMenu = {
  component: (
    <AkNavigationItem
      linkComponent={WrapperLinkComponent}
      href={slug.stationType.base}
      icon={Icon.users}
      text="Station type"
    />
  )
}

const stationAutoMenu = {
  component: (
    <AkNavigationItem
      linkComponent={WrapperLinkComponent}
      href={slug.stationAuto.base}
      icon={Icon.gallerySlider}
      text="Station auto"
    />
  )
}

export default [
  groupConfirmManager,
  measuringMenu,
  stationTypeMenu,
  stationAutoMenu
]
