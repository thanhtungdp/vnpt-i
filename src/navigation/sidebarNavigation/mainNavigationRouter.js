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
import { translate } from 'hoc/create-lang'

const dashboardMenu = {
  component: (
    <AkNavigationItem
      linkComponent={WrapperLinkComponent}
      href={slug.dashboard}
      icon={Icon.dashboard}
      text="Dashboard"
      //  text={translate('menuApp.dashboard')}
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
      //  text={translate('menuApp.monitoring')}
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
      //  text={translate('menuApp.map')}
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
      //  text={translate('menuApp.dataSearch')}
    />
  )
}

const avgDataMenu = {
  component: protectRole(ROLE.AVG_SEARCH.VIEW)(
    <AkNavigationItem
      linkComponent={WrapperLinkComponent}
      icon={Icon.graphLine}
      href={slug.avgSearch.base}
      //  text={translate('menuApp.avgData')}
      text="Average Data"
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
      //  text={translate('menuApp.measuring')}
      text="Parameter"
    />
  )
}

const stationTypeMenu = {
  component: protectRole(ROLE.STATION_TYPE.VIEW)(
    <AkNavigationItem
      linkComponent={WrapperLinkComponent}
      href={slug.stationType.base}
      icon={Icon.hipchat}
      // text={translate('menuApp.stationType')}
      text="Type Of Station"
    />
  )
}

const stationAutoMenu = {
  component: protectRole(ROLE.STATION_AUTO.VIEW)(
    <AkNavigationItem
      linkComponent={WrapperLinkComponent}
      href={slug.stationAuto.base}
      icon={Icon.book}
      //  text={translate('menuApp.stationAuto')}
      text="Station Name"
    />
  )
}

const groupAdmin = {
  component: protectRole('', [ROLE.USER.VIEW, ROLE.ROLE.VIEW], 'group')(
    <NavigationWrapper text="Administration">
      <AkNavigationItemGroup title="Administration" />
    </NavigationWrapper>
  )
}

const userMenu = {
  component: protectRole(ROLE.USER.VIEW)(
    <AkNavigationItem
      linkComponent={WrapperLinkComponent}
      href={slug.user.base}
      icon={Icon.person}
      //  text={translate('menuApp.user')}
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
      //  text={translate('menuApp.role')}
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
      //  text={translate('menuApp.subScription')}
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
