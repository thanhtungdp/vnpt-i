import React, { PureComponent } from 'react'
import { Button, Icon, Avatar, Popover, Upload, message } from 'antd'
import PropTypes from 'prop-types'
import { autobind } from 'core-decorators'
import { mapPropsToFields } from 'utils/form'
import createLanguageHoc, { langPropTypes } from 'hoc/create-lang'
import swal from 'sweetalert2'
import MediaApi from 'api/MediaApi'
import Clearfix from 'components/elements/clearfix'
import styled from 'styled-components'
import { SketchPicker } from 'react-color'

const AvatarWrapper = styled.div`
  padding: 4px;
  width: 50px;
  height: 50px;
  cursor: pointer;
  .ant-upload {
    width: 100%;
    height: 100%;
  }
  .ant-upload-list-item {
    display: none !important;
  }
  .ant-avatar-square {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 4px;
    > img {
      width: 100%;
      height: auto !important;
    }
  }
`

const HeaderWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  flex-wrap: wrap;
  width: 250px;
`

@autobind
export default class SelectImage extends PureComponent {
  static propTypes = {
    onChangeValue: PropTypes.func
  }

  state = {
    urlIcon: '',
    visiblePop: false,
    color: '',
    urlIconList: [
      '/images/dashboard/cloud.png',
      '/images/dashboard/groundwater.png',
      '/images/dashboard/surfaceWater.png',
      '/images/dashboard/wasteWater.png'
    ]
  }
  setIcon(urlIcon) {
    this.setState(
      {
        urlIcon
      },
      () => {
        if (this.props.onChangeValue) this.props.onChangeValue(this.state)
      }
    )
  }

  handelPop() {
    this.setState({
      visiblePop: !this.state.visiblePop
    })
  }

  handelColor(color) {
    this.setState({ color: color.hex }, () => {
      if (this.props.onChangeValue) this.props.onChangeValue(this.state)
    })
  }

  async componentWillMount() {
    if (this.props.initialValues) {
      let updateState = {}
      if (
        this.props.initialValues.urlIcon &&
        this.props.initialValues.urlIcon !== ''
      )
        updateState.urlIcon = this.props.initialValues.urlIcon
      if (this.props.initialValues.color)
        updateState.color = this.props.initialValues.color
      this.setState(updateState)
    }
  }

  render() {
    const urlPhotoUpload = MediaApi.urlPhotoUploadWithDirectory(
      'icon-station-type'
    )
    const me = this
    const props = {
      name: 'file',
      action: urlPhotoUpload,
      listType: 'picture',
      headers: {
        authorization: 'authorization-text'
      },
      onChange(info) {
        if (info.file.status !== 'uploading') {
          console.log(info.file, info.fileList)
        }
        if (info.file.status === 'done') {
          console.log(info)
          me.setState({
            urlIconList: [...me.state.urlIconList, info.file.response.url]
          })
          message.success(`${info.file.name} file uploaded successfully`)
        } else if (info.file.status === 'error') {
          message.error(`${info.file.name} file upload failed.`)
        }
      }
    }

    const content = (
      <HeaderWrapper>
        <AvatarWrapper>
          <Upload {...props}>
            <Avatar
              style={{ backgroundColor: '#87d068' }}
              shape="square"
              icon="plus"
            />
          </Upload>
        </AvatarWrapper>

        {this.state.urlIconList.map((item, index) => {
          return (
            <AvatarWrapper key={index} onClick={() => this.setIcon(item)}>
              <Avatar shape="square" src={item} />
            </AvatarWrapper>
          )
        })}
      </HeaderWrapper>
    )
    const contentPicker = (
      <SketchPicker color={this.state.color} onChange={this.handelColor} />
    )
    return (
      <Popover
        visible={this.state.visiblePop}
        content={content}
        title="Choose Icon"
        onClick={this.handelPop}
        trigger="click"
      >
        <Popover
          visible={this.state.visiblePop}
          placement="bottom"
          content={contentPicker}
          title="Choose Color"
          trigger="click"
        >
          <Avatar
            shape="square"
            size="large"
            style={{ cursor: 'pointer', backgroundColor: this.state.color }}
            src={this.state.urlIcon}
          >
            Icon
          </Avatar>
        </Popover>
      </Popover>
    )
  }
}
