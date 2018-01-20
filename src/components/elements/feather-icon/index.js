import React from 'react'
import Feather from 'feather-icons'
import PropTypes from 'prop-types'

export default class FeatherIcon extends React.Component {
  static propTypes = {
    name: PropTypes.string
  }

  render() {
    return (
      <span
        dangerouslySetInnerHTML={{
          __html: Feather.icons[this.props.name].toSvg()
        }}
      />
    )
  }
}
