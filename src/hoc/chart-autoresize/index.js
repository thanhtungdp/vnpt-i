import React from 'react'
import PropTypes from 'prop-types'
import withSizes from 'react-sizes'
import { connect } from 'react-redux'
import ListLoaderCp from 'components/content-loader/list-loader'
import createLoader from 'hoc/content-loader'

const ListLoader = createLoader({
  component: <ListLoaderCp/>,
  items: 1
})(null)

export default function createChartAutoResize(Component) {
  @connect(state => ({
    navigationIsOpen: state.theme.navigation.isOpen
  }))
  @withSizes(({ width }) => ({
    width
  }))
  class ChartAutoResize extends React.Component {
    static propTypes = {
      navigationIsOpen: PropTypes.bool,
      width: PropTypes.number
    }

    state = {
      isShow: true
    }

    componentWillReceiveProps(nextProps) {
      if (
        (nextProps.width !== this.props.width ||
          nextProps.navigationIsOpen !== this.props.navigationIsOpen) &&
        !this.block
      ) {
        this.block = true
        this.setState(
          {
            isShow: false
          },
          () => {
            setTimeout(() => {
              this.setState({
                isShow: true
              })
              this.block = false
            }, 1000)
          }
        )
      }
    }

    render() {
      if (!this.state.isShow) return <ListLoader />
      return (
        <Component ref={ref => (this.chartComponent = ref)} {...this.props} />
      )
    }
  }
  return ChartAutoResize
}
