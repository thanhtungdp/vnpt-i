import React from 'react'
import { AkNavigationItemGroup, AkNavigationItem } from '@atlaskit/navigation'
import {
  // createChildListMenuItem,
  WrapperLinkComponent
} from '../../utils/sidebarNavigation'
import slug from '../../constants/slug'
import Icon from '../../themes/icon'
import NavigationWrapper from './NavigationWrapper'

const dashboardMenu = {
  component: (
    <AkNavigationItem
      linkComponent={WrapperLinkComponent}
      href={slug.dashboard}
      icon={Icon.dashboard}
      text="Dashboard"
    />
  )
}

const monitoringMenu = {
  component: (
    <AkNavigationItem
      linkComponent={WrapperLinkComponent}
      href={slug.monitoring.base}
      icon={Icon.screen}
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
      icon={Icon.graphBar}
      href={slug.dataSearch.base}
      text="Data Search"
    />
  )
}

const avgDataMenu = {
  component: (
    <AkNavigationItem
      linkComponent={WrapperLinkComponent}
      icon={Icon.graphLine}
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
      icon={Icon.hipchat}
      text="Station type"
    />
  )
}

const stationAutoMenu = {
  component: (
    <AkNavigationItem
      linkComponent={WrapperLinkComponent}
      href={slug.stationAuto.base}
      icon={Icon.book}
      text="Station auto"
    />
  )
}

const groupAdmin = {
  component: (
    <NavigationWrapper text="Admin management">
      <AkNavigationItemGroup title="Admin management" />
    </NavigationWrapper>
  )
}

const userMenu = {
  component: (
    <AkNavigationItem
      linkComponent={WrapperLinkComponent}
      href={slug.user.base}
      icon={Icon.person}
      text="User"
    />
  )
}

const roleMenu = {
  component: (
    <AkNavigationItem
      linkComponent={WrapperLinkComponent}
      href={slug.role.base}
      icon={Icon.peopleGroup}
      text="Role"
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
  stationAutoMenu,
  groupAdmin,
  userMenu,
  roleMenu
]
