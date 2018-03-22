import React from 'react'
import styled from 'styled-components'
import Label from '../label'
import swal from 'sweetalert2'
import { autobind } from 'core-decorators'
import PropTypes from 'prop-types'
import { Upload, Icon } from 'antd'
import update from 'react-addons-update'
import MediaApi from 'api/MediaApi'

const View = styled.div``

const uploadButton = (
  <div>
    <Icon type="plus" />
    <div className="ant-upload-text">Upload</div>
  </div>
)

@autobind
export default class UpdateLoadImage extends React.PureComponent {
  static propTypes = {
    value: PropTypes.string
  }

  state = {
    fileList: []
  }

  getFileLists() {
    return [
      {
        uuid: -1,
        url: this.props.value,
        name: ''
      }
    ]
  }

  async componentWillMount() {
    if (this.props.value) {
      this.setState(
        update(this.state, {
          fileList: {
            $push: [
              {
                uid: -1,
                url: this.props.value,
                name: '',
                status: 'done'
              }
            ]
          }
        }),
        () => {
          console.log(this.state)
        }
      )
    }
  }

  handleImageChange = ({ fileList, file, event }) => {
    let newFileList = fileList
    if (file.status === 'error') {
      swal({
        title: 'upload image fail',
        type: 'error'
      })
      newFileList = []
    }
    this.setState({
      fileList: newFileList
    })
    if (file.status === 'done') {
      this.props.onChange(file.response.url)
    }
    if (fileList.length === 0) {
      this.props.onChange('')
    }
  }

  render() {
    const { name, ...otherProps } = this.props
    return (
      <View>
        {this.props.label && <Label>{this.props.label}</Label>}
        <Upload
          {...otherProps}
          action={MediaApi.urlPhotoUploadWithDirectory('profile')}
          listType="picture-card"
          fileList={this.state.fileList}
          onPreview={this.handlePreview}
          onChange={this.handleImageChange}
        >
          {this.state.fileList.length > 0 ? '' : uploadButton}
        </Upload>
      </View>
    )
  }
}
