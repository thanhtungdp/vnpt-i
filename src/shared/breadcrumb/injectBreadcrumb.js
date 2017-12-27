import { connect } from 'react-redux'

export default function injectBreadcrumbs (Component) {
  return connect(state => ({
    breadcrumbs: state.breadcrumbs
  }))(Component)
}
