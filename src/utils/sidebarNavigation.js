import React from 'react'
import Link from 'components/elements/link'
import { AkNavigationItem } from '@atlaskit/navigation'

export class WrapperLinkComponent extends React.PureComponent {
  static defaultProps = {
    onClick: () => {}
  }

  render() {
    const props = this.props
    return (
      <Link
        to={props.href}
        onClick={this.props.onClick}
        className={props.className}
        title={props.title}
        style={props.style}
      >
        {props.children}
      </Link>
    )
  }
}

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
      const akItem = (
        <AkNavigationItem
          href={child.url}
          linkComponent={WrapperLinkComponent}
          icon={child.icon}
          text={child.text}
        />
      )
      return { component: akItem, url: child.url }
    })
  }
}

export function getIndexLocationWithNavigationRouter(
  { pathname },
  navigationRouter = []
) {
  const navigationIndex = navigationRouter.findIndex(router => {
    if (router.component.props.href === pathname) return true
    if (!router.childMenu) return false
    const menuChildIndex = router.childMenu.findIndex(
      child => child.url === pathname
    )
    return menuChildIndex > -1 ? true : false
  })
  return navigationIndex
}
