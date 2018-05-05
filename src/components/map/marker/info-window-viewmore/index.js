import React from 'react'
import { autobind } from 'core-decorators'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { Menu, Dropdown, Icon } from 'antd'
import slug from 'constants/slug'
import LinkA from 'components/elements/link-a'
import { translate } from 'hoc/create-lang'
import { SHAPE } from 'themes/color'
import ROLE from 'constants/role'
import protectRole from 'hoc/protect-role'

const WrapperViewMore = styled.div`
  position: absolute;
  right: 0px;
  top 0px;
  color: ${SHAPE.PRIMARY};
`

const LinkSpan = styled.div`
  &:hover {
    cursor: pointer;
  }
`

@autobind
export default class InfoWindowViewMore extends React.PureComponent {
  static propTypes = {
    stationKey: PropTypes.string,
    stationId: PropTypes.string,
    stationTypeKey: PropTypes.string,
    stationName: PropTypes.string,
    options: PropTypes.object
  }

  handleClickDataSearch(e) {
    e.preventDefault()
    const formSearch = {
      stationType: this.props.stationTypeKey,
      stationAuto: this.props.stationKey,
      measuringList: this.props.measuringList.map(m => m.key),
      measuringData: this.props.measuringList,
      searchNow: true
    }
    const url = slug.dataSearch.base + '?formData=' + JSON.stringify(formSearch)
    window.open(url, '_blank')
  }

  handleClickCamera() {}

  handleClickSampling() {}
  render() {
    const options = this.props.options
    const isCamera = options && options.camera && options.camera.allowed
    const isSampling = options && options.camera && options.sampling.allowed
    console.log(options)
    const dropdown = (
      <Menu>
        <Menu.Item key="0">
          <LinkA onClick={this.handleClickDataSearch} target="_blank">
            View Data
          </LinkA>
        </Menu.Item>
        {isCamera &&
          protectRole(ROLE.MONITORING.CAMERA) && (
            <Menu.Item key="1">
              <LinkA
                onClick={this.handleClickCamera}
                target="_blank"
                href={
                  slug.monitoring.viewCameraWithKey + '/' + this.props.stationId
                }
              >
                Camera
              </LinkA>
            </Menu.Item>
          )}
        {isSampling &&
          protectRole(ROLE.MONITORING.CONTROL) && (
            <Menu.Item key="2">
              <LinkA
                onClick={this.handleClickSampling}
                target="_blank"
                href={
                  slug.controlStation.triggerWithKey +
                  `/` +
                  this.props.stationKey +
                  '/' +
                  this.props.stationName
                }
              >
                Sampling
              </LinkA>
            </Menu.Item>
          )}
      </Menu>
    )
    return (
      <WrapperViewMore>
        <Dropdown overlay={dropdown} trigger={['click']}>
          <LinkSpan className="ant-dropdown-link">
            <Icon type="right" /> {translate('dashboard.viewMore')}
          </LinkSpan>
        </Dropdown>
      </WrapperViewMore>
    )
  }
}
