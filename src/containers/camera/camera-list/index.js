import React, { PureComponent } from 'react'
import { message } from 'antd'
import { autobind } from 'core-decorators'
import { withRouter } from 'react-router-dom'
import PageContainer from 'layout/default-sidebar-layout/PageContainer'
import Breadcrumb from 'containers/camera/breadcrumb'
import StationAutoApi from 'api/StationAuto'
import styled from 'styled-components'
import Clearfix from 'components/elements/clearfix'
import CameraItem from './CameraItem'

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

const WrapperItem = styled.div`
  width: ${props => (props.isFullWidth ? '100%' : '50%')};
`

@withRouter
@autobind
export default class CameraForm extends PureComponent {
  state = {
    isLoaded: false,
    cameraList: [],
    name: ''
  }

  async componentWillMount() {
    const _id = this.props.match.params.key
    const res = await StationAutoApi.getStationAuto(_id)
    if (res.success) {
      const cameraList = res.data.options.camera.list || []
      this.setState({
        cameraList: cameraList,
        name: res.data.name,
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
    const isFullWidth =
      this.state.cameraList.length % 2 === 1 &&
      index === this.state.cameraList.length - 1
    return (
      <WrapperItem key={item.name} isFullWidth={isFullWidth}>
        <CameraItem {...item} index={index} />
      </WrapperItem>
    )
  }

  render() {
    return (
      <PageContainer isLoading={!this.state.isLoaded}>
        <Breadcrumb
          items={[
            'list',
            {
              id: '_id',
              name: this.state.name
            }
          ]}
        />
        <Wrapper>
          {this.state.cameraList.map((item, index) => {
            return this.renderPanel(item, index)
          })}
        </Wrapper>
        <Clearfix height={50} />
      </PageContainer>
    )
  }
}
