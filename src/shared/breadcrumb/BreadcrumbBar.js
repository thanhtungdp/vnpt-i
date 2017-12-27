import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { SHAPE, TEXT } from 'themes/color'
import { Link } from 'react-router-dom'
import injectBreadcrumb from './injectBreadcrumb'

const BreadcrumbBarStyle = styled.div`
  display: flex;
  flex-direction: row;
`

const BreadCrumbItem = styled(Link)`
  font-size: ${props => (props.last ? 22 : 18)}px;
  display: flex;
  align-items: center;
  font-weight: 600;
  i {
    margin-right: 8px;
  }
  &:hover {
    text-decoration: none;
  }
  ${props =>
    props.last
      ? `
    color: ${TEXT.NORMAL} !important;
  `
      : `
    position: relative;
    top: 1px;
    color: ${TEXT.GRAY} !important;
  `} ${props =>
      !props.first
        ? `
    ::before{
      display: inline-block;
      padding-right: .5rem;
      padding-left: .5rem;
      font-family: 'simple-line-icons';
      color: ${SHAPE.GRAYBOLD};
      content: "\\e606";
      font-size: 18px;
      position: relative;
      top: 2px;
    }
  `
        : null};
`

function BreadcrumbItem({ icon, index, last, name, href }) {
  const breadcrumb = (
    <BreadCrumbItem
      className="fadeIn animated"
      to={href}
      first={index === 0}
      last={last}
    >
      {icon && <i className={icon} />}
      {name}
    </BreadCrumbItem>
  )
  return breadcrumb
}

function BreadcrumbBar({ breadcrumbs }) {
  return (
    <BreadcrumbBarStyle>
      {breadcrumbs.map((breadcrumb, index) => (
        <BreadcrumbItem
          key={breadcrumb.id}
          {...breadcrumb}
          index={index}
          last={index === breadcrumbs.length - 1}
        />
      ))}
    </BreadcrumbBarStyle>
  )
}
BreadcrumbBar.propTypes = {
  breadcrumbs: PropTypes.arrayOf(
    PropTypes.shape({
      icon: PropTypes.string,
      name: PropTypes.string,
      href: PropTypes.object
    })
  )
}

export default injectBreadcrumb(BreadcrumbBar)
