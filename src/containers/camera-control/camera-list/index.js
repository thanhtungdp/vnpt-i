import React from 'react'
import PropTypes from 'prop-types'
import CategoryApi from 'api/CategoryApi'
import PageContainer from 'layout/default-sidebar-layout/PageContainer'
import slug from 'constants/slug'
import { autobind } from 'core-decorators'
import Breadcrumb from '../breadcrumb'
import createLanguageHoc, { langPropTypes } from 'hoc/create-lang'
import styled from 'styled-components'
import DynamicTable from 'components/elements/dynamic-table'
import protectRole from 'hoc/protect-role'
import ROLE from 'constants/role'
import CameraItem from 'components/elements/camera-item'
import Clearfix from 'components/elements/clearfix'
import { Link } from 'react-router-dom'
import StationAutoApi from 'api/StationAuto'

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  flex-wrap: wrap;

  // .ant-collapse-item {
  // width: 50%;
  // }
  .card {
    width: 100%;
  }

  .ant-collapse-header {
    text-align: center;
  }
`

@protectRole(ROLE.MONITORING.CAMERA)
@createLanguageHoc
@autobind
export default class CameraList extends React.Component {
  static propTypes = {}

  constructor(props) {
    super(props)
    this.state = {
      cameraList: []
    }
  }

  async componentWillMount() {
    let res = await StationAutoApi.getCamera()
    if (res.success) {
      //xu ly data camera
      let cameraList = []
      res.data.map(item => {
        item.options.camera.list.forEach(function(obj) {
          obj.stationName = item.name
        })
        cameraList = cameraList.concat(item.options.camera.list)
      })
      this.setState({
        cameraList: cameraList
      })
    }
  }

  //'http://118.69.55.217:88/?url=rtsp://admin:hd543211@115.75.120.16:1024/ISAPI/Streaming/channels/501'
  render() {
    return (
      <PageContainer>
        <Breadcrumb items={['list']} />
        <Wrapper>
          {this.state.cameraList.map((item, index) => {
            return [
              <CameraItem
                name={item.stationName + ' - ' + item.name}
                rtspUrl={item.rtspUrl}
                index={index}
                key={item.stationName + ' - ' + item.name}
              />,
              <Clearfix width={15} />
            ]
          })}
        </Wrapper>
      </PageContainer>
    )
  }
}
