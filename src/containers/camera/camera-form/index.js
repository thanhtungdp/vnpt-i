import React, { PureComponent } from 'react'
import { Collapse, message, Spin } from 'antd'
import { autobind } from 'core-decorators'
import { withRouter } from 'react-router-dom'
import PageContainer from 'layout/default-sidebar-layout/PageContainer'
import Breadcrumb from 'containers/camera/breadcrumb'
import StationAutoApi from 'api/StationAuto'
import styled from 'styled-components'
import Clearfix from 'components/elements/clearfix'

const Panel = Collapse.Panel

const Wrapper = styled.div`
  .ant-collapse {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    flex-wrap: wrap;
  }
  .ant-collapse-item {
    width: 50%;
  }
  .ant-collapse-header {
    text-align: center;
  }
`

const PANEL_HEIGHT = '250px'
const PANEL_HEIGHT_FULL = '500px'

@withRouter
@autobind
export default class CameraForm extends PureComponent {
  state = {
    isLoaded: false,
    cameraList: []
  }

  async componentWillMount() {
    const _id = this.props.match.params.key
    const res = await StationAutoApi.getStationAuto(_id)
    if (res.success) {
      const cameraList = res.data.options.camera.list || []
      this.setState({
        cameraList: cameraList,
        isLoaded: true
      })
    } else {
      this.setState({
        isLoaded: true
      })
      message.error('something went wrong')
    }
  }

  renderPanel(item, index) {
    const isHaveFullWidth =
      this.state.cameraList.length % 2 === 1 &&
      index === this.state.cameraList.length - 1
    const WrapperItem = styled.div`
      height: ${isHaveFullWidth ? PANEL_HEIGHT_FULL : PANEL_HEIGHT};
    `
    return (
      <Panel
        header={item.name}
        key={index}
        showArrow={false}
        style={{
          width: isHaveFullWidth ? '100%' : '50%'
        }}
      >
        <WrapperItem>
          <iframe
            src={item.rtspUrl}
            title={item.name + item.index}
            width={'100%'}
            height={'1440px'}
          />
        </WrapperItem>
      </Panel>
    )
  }

  render() {
    return (
      <PageContainer>
        <Breadcrumb
          items={[
            'list',
            {
              id: '_id',
              name: this.props.match.params.key
                ? this.props.match.params.key
                : ''
            }
          ]}
        />
        <Spin spinning={!this.state.isLoaded}>
          <Wrapper>
            <Collapse
              activeKey={this.state.cameraList.map((item, index) => index + '')}
            >
              {this.state.cameraList.map((item, index) => {
                return this.renderPanel(item, index)
              })}
            </Collapse>
          </Wrapper>
        </Spin>
        <Clearfix height={50} />
      </PageContainer>
    )
  }
}
