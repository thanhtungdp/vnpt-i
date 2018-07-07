import React from 'react'
import PageContainer from 'layout/default-sidebar-layout/PageContainer'
import { autobind } from 'core-decorators'
import Breadcrumb from '../breadcrumb'
import createLanguageHoc from 'hoc/create-lang'
import styled from 'styled-components'
import protectRole from 'hoc/protect-role'
import ROLE from 'constants/role'
import CameraItem from 'components/elements/camera-item'
import Clearfix from 'components/elements/clearfix'
import StationAutoApi from 'api/StationAuto'
import CameraFilter from '../camera-filter'
import queryString from 'query-string'
import { getConfigApi } from 'config'

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
  constructor(props) {
    super(props)
    this.state = {
      dataCameraList: [],
      cameraList: [],
      dataSearch: {}
    }
  }

  async componentWillMount() {
    let res = await StationAutoApi.getCamera()
    if (res.success) {
      //xu ly data camera
      let cameraList = []
      /* eslint-disable */
      res.data.map(item => {
        item.options.camera.list.forEach(function(obj) {
          ;(obj.stationName = item.name), (obj.stationKey = item.key)
        })
        cameraList = cameraList.concat(item.options.camera.list)
      })
      /* eslint-enable */
      this.setState({
        dataCameraList: cameraList,
        cameraList: cameraList.filter(
          item =>
            !this.state.dataSearch.station ||
            item.stationKey === this.state.dataSearch.station ||
            this.state.dataSearch.station === 'ALL'
        )
      })
    }
  }

  onChangeSearch(dataSearch) {
    this.setState({
      cameraList: this.state.dataCameraList.filter(
        item =>
          !dataSearch.station ||
          item.stationKey === dataSearch.station ||
          dataSearch.station === 'ALL'
      ),
      dataSearch: dataSearch
    })
  }

  renderSearch() {
    let data = {}
    const query = queryString.parse(this.props.location.search)
    if (query.stationKey) data.stationKey = query.stationKey
    return (
      <CameraFilter onChangeSearch={this.onChangeSearch} initialValues={data} />
    )
  }

  //'http://118.69.55.217:88/?url=rtsp://admin:hd543211@115.75.120.16:1024/ISAPI/Streaming/channels/501'
  render() {
    return (
      <PageContainer center={this.renderSearch()} right={<div />}>
        <Breadcrumb items={['list']} />
        <Wrapper>
          {this.state.cameraList.map((item, index) => {
            return [
              <CameraItem
                name={item.stationName + ' - ' + item.name}
                rtspUrl={
                  item.rtspUrl.includes('rtsp')
                    ? getConfigApi().camera + '/?url=' + item.rtspUrl
                    : item.rtspUrl
                }
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
