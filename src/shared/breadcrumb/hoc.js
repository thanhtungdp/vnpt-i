import PropTypes from 'prop-types'
import React from 'react'
import Breadcrumb from './Breadcrumb'

export default function createBreadCrumbHoc(config) {
  return class BreadcrumbCustom extends React.Component {
    static propTypes = {
      items: PropTypes.arrayOf(PropTypes.any)
    }
    renderBreadcrumb(item) {
      let itemObject = item
      if (typeof item === 'string') {
        itemObject = config[item]
      }
      if (typeof item === 'object' && item.key) {
        itemObject = {
          ...config[item.key],
          ...item.custom
        }
      }
      return (
        <Breadcrumb
          icon={itemObject.icon}
          id={itemObject.id}
          key={itemObject.id}
          name={itemObject.name}
          href={itemObject.href}
        />
      )
    }

    render() {
      return (
        <span>{this.props.items.map(item => this.renderBreadcrumb(item))}</span>
      )
    }
  }
}
