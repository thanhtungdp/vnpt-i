import React from 'react'
import { autobind } from 'core-decorators'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { Card, CardHeader } from 'reactstrap'
import { Link } from 'react-router-dom'
import slug from 'constants/slug'

const CameraItemWrapper = styled.div`
  margin-bottom: 20px;
  cursor: pointer;
`

const RATIO_CAMERA = 0.44

@autobind
export default class CameraItem extends React.PureComponent {
  static propTypes = {
    name: PropTypes.string,
    rtspUrl: PropTypes.string,
    index: PropTypes.number,
    isFullWidth: PropTypes.bool
  }

  state = {
    width: 0,
    height: 0
  }

  componentDidMount() {
    const offsetWidth = this.cameraRef.offsetWidth - 2
    this.setState({
      width: offsetWidth,
      height: offsetWidth * RATIO_CAMERA
    })
  }

  getIframeProps() {
    return {
      width: this.state.width + 'px',
      height: this.state.height + 'px'
    }
  }

  renderCamera(rtspUrl) {
    if (rtspUrl.includes('rtsp'))
      return (
        <iframe
          style={{ border: '0px', overflow: 'hidden' }}
          src={this.props.rtspUrl}
          scrolling="no"
          title={this.props.name + this.props.index}
          {...this.getIframeProps()}
        />
      )
    else
      return (
        <video width="100%" autoplay="autoplay" loop="loop">
          <source src={rtspUrl} type="video/mp4" />
        </video>
      )
  }

  render() {
    return (
      <CameraItemWrapper
        style={{
          width: this.props.isFullWidth ? '100%' : '30%'
        }}
        innerRef={ref => (this.cameraRef = ref)}
      >
        <Card>
          {this.state.width && this.props.rtspUrl
            ? this.renderCamera(this.props.rtspUrl)
            : null}

          <Link
            to={
              slug.cameraControl.detailWithKey +
              `/${encodeURIComponent(this.props.rtspUrl)}` +
              `/${encodeURIComponent(this.props.name)}`
            }
          >
            <CardHeader
              style={{
                display: 'flex',
                justifyContent: 'center'
              }}
            >
              <strong>{this.props.name}</strong>
            </CardHeader>
          </Link>
        </Card>
      </CameraItemWrapper>
    )
  }
}
