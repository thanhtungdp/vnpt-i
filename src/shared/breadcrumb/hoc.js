import PropTypes from 'prop-types'
import React from 'react'
import Breadcrumb from './Breadcrumb'

export default function createBreadCrumbHoc(config) {
  return class BreadcrumbCustom extends React.Component {
    static propTypes = {
      items: PropTypes.arrayOf(PropTypes.string)
    }
    renderBreadcrumb(item, index) {
      if (typeof item === 'string') {
        return (
          <Breadcrumb
            key={config[item].id}
            id={config[item].id}
            name={config[item].name}
            href={config[item].href}
          />
        )
      } else {
        return <Breadcrumb id={item.id} key={item.id} name={item.name} href={item.href} />
      }
    }

    render() {
      return (
        <span>
          {this.props.items.map((item, index) =>
            this.renderBreadcrumb(item, index)
          )}
        </span>
      )
    }
  }
}
