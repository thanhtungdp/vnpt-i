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

const dashboardMenu = {
  component: (
    <AkNavigationItem
      linkComponent={WrapperLinkComponent}
      href={slug.dashboard}
      icon={Icon.dashboardIco}
      text="Dashboard"
    />
  )
}

const monitoringMenu = {
  component: (
    <AkNavigationItem
      linkComponent={WrapperLinkComponent}
      href={slug.onlineMonitoring.base}
      icon={Icon.screenIcon}
      text="Monitoring"
    />
  )
}

const mapMenu = {
  component: (
    <AkNavigationItem
      linkComponent={WrapperLinkComponent}
      href={slug.map.base}
      icon={Icon.location}
      text="Map"
    />
  )
}

const groupData = {
  component: (
    <NavigationWrapper text="Data">
      <AkNavigationItemGroup title="Data" />
    </NavigationWrapper>
  )
}

const dataSearchMenu = {
  component: (
    <AkNavigationItem
      linkComponent={WrapperLinkComponent}
      icon={Icon.graphBarIcon}
      href={slug.dataSearch.base}
      text="Data Search"
    />
  )
}

const avgDataMenu = {
  component: (
    <AkNavigationItem
      linkComponent={WrapperLinkComponent}
      icon={Icon.graphLineIcon}
      href={slug.avgSearch.base}
      text="AVG Data"
    />
  )
}

const groupManager = {
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
      icon={Icon.hipchatIcon}
      text="Station type"
    />
  )
}

const stationAutoMenu = {
  component: (
    <AkNavigationItem
      linkComponent={WrapperLinkComponent}
      href={slug.stationAuto.base}
      icon={Icon.bookIcon}
      text="Station auto"
    />
  )
}

export default [
  dashboardMenu,
  monitoringMenu,
  mapMenu,
  groupData,
  dataSearchMenu,
  avgDataMenu,
  groupManager,
  measuringMenu,
  stationTypeMenu,
  stationAutoMenu
]
