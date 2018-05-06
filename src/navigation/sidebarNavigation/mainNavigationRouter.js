import React from 'react'
import { AkNavigationItemGroup, AkNavigationItem } from '@atlaskit/navigation'
import {
  // createChildListMenuItem,
  WrapperLinkComponent
} from '../../utils/sidebarNavigation'
import slug from '../../constants/slug'
import Icon from '../../themes/icon'
import NavigationWrapper from './NavigationWrapper'
import protectRole from 'hoc/protect-role'
import ROLE from 'constants/role'

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
  component: protectRole(ROLE.MONITORING.VIEW)(
    <AkNavigationItem
      linkComponent={WrapperLinkComponent}
      href={slug.monitoring.base}
      icon={Icon.screen}
      text="Monitoring"
    />
  )
}

const mapMenu = {
  component: protectRole(ROLE.MAP.VIEW)(
    <AkNavigationItem
      linkComponent={WrapperLinkComponent}
      href={slug.map.base}
      icon={Icon.location}
      text="Map"
    />
  )
}

const groupData = {
  component: protectRole(
    '',
    [ROLE.DATA_SEARCH.VIEW, ROLE.AVG_SEARCH.VIEW],
    'group'
  )(
    <NavigationWrapper text="Data">
      <AkNavigationItemGroup title="Data" />
    </NavigationWrapper>
  )
}

const dataSearchMenu = {
  component: protectRole(ROLE.DATA_SEARCH.VIEW)(
    <AkNavigationItem
      linkComponent={WrapperLinkComponent}
      icon={Icon.graphBar}
      href={slug.dataSearch.base}
      text="Data Search"
    />
  )
}

const avgDataMenu = {
  component: protectRole(ROLE.AVG_SEARCH.VIEW)(
    <AkNavigationItem
      linkComponent={WrapperLinkComponent}
      icon={Icon.graphLine}
      href={slug.avgSearch.base}
      text="AVG Data"
    />
  )
}

const groupManager = {
  component: protectRole(
    '',
    [ROLE.MEASURING.VIEW, ROLE.STATION_TYPE.VIEW, ROLE.STATION_AUTO.VIEW],
    'group'
  )(
    <NavigationWrapper text="Manage">
      <AkNavigationItemGroup title="Manage" />
    </NavigationWrapper>
  )
}

const measuringMenu = {
  component: protectRole(ROLE.MEASURING.VIEW)(
    <AkNavigationItem
      linkComponent={WrapperLinkComponent}
      href={slug.measuring.base}
      icon={Icon.quizLists}
      text="Measuring"
    />
  )
}

const stationTypeMenu = {
  component: protectRole(ROLE.STATION_TYPE.VIEW)(
    <AkNavigationItem
      linkComponent={WrapperLinkComponent}
      href={slug.stationType.base}
      icon={Icon.hipchat}
      text="Station type"
    />
  )
}

const stationAutoMenu = {
  component: protectRole(ROLE.STATION_AUTO.VIEW)(
    <AkNavigationItem
      linkComponent={WrapperLinkComponent}
      href={slug.stationAuto.base}
      icon={Icon.book}
      text="Station auto"
    />
  )
}

const groupAdmin = {
  component: protectRole('', [ROLE.USER.VIEW, ROLE.ROLE.VIEW], 'group')(
    <NavigationWrapper text="Admin management">
      <AkNavigationItemGroup title="Admin management" />
    </NavigationWrapper>
  )
}

const userMenu = {
  component: protectRole(ROLE.USER.VIEW)(
    <AkNavigationItem
      linkComponent={WrapperLinkComponent}
      href={slug.user.base}
      icon={Icon.person}
      text="User"
    />
  )
}

const roleMenu = {
  component: protectRole(ROLE.ROLE.VIEW)(
    <AkNavigationItem
      linkComponent={WrapperLinkComponent}
      href={slug.role.base}
      icon={Icon.peopleGroup}
      text="Role"
    />
  )
}

const subscriptionMenu = {
  component: protectRole(ROLE.ROLE.VIEW)(
    <AkNavigationItem
      linkComponent={WrapperLinkComponent}
      href={slug.subscription.base}
      icon={Icon.creditCard}
      text="Subscription"
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
  roleMenu,
  subscriptionMenu
]
