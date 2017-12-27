import { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connectAutoDispatch } from 'redux/connect'
import { addBreadcrumb, deleteBreadcrumb, updateBreadcrumb } from './action'

@connectAutoDispatch(state => ({}), {
  addBreadcrumb,
  deleteBreadcrumb,
  updateBreadcrumb
})
export default class Breadcrumb extends PureComponent {
  static propTypes = {
    icon: PropTypes.string,
    name: PropTypes.string,
    href: PropTypes.object,
    autoDestroy: PropTypes.bool
  }

  static defaultProps = {
    autoDestroy: true
  }

  componentDidMount () {
    this.props.addBreadcrumb(this.props)
  }

  componentDidUpdate () {
    this.props.updateBreadcrumb(this.props)
  }

  componentWillUnmount () {
    if (this.props.autoDestroy) {
      this.props.deleteBreadcrumb(this.props)
    }
  }

  destroy = () => {
    this.props.deleteBreadcrumb(this.props)
  }

  render () {
    return null
  }
}
