import React from 'react'
import { Link } from 'react-router-dom'
import { AkNavigationItem } from '@atlaskit/navigation'

/**
 *
 * @param rootComponent{icon, text}
 * @param childComponent:Array<{url, icon, text}>
 * @returns {{component: XML, childMenu: [component: XML]}}
 */
export function createChildListMenuItem(rootComponent, childComponent = []) {
  return {
    component: (
      <AkNavigationItem icon={rootComponent.icon} text={rootComponent.text} />
    ),
    childMenu: childComponent.map(child => {
      const akItem = <AkNavigationItem icon={child.icon} text={child.text} />
      const component = child.url ? (
        <Link to={child.url} text={child.text}>
          {akItem}
        </Link>
      ) : (
        akItem
      )
      return { component }
    })
  }
}
