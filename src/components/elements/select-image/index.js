import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import MediaApi from 'api/MediaApi'
import LinkA from 'components/elements/link-a'
import LoaderCircle from 'components/elements/loader-circle'
import Clearfix from 'components/elements/clearfix'
import { autobind } from 'core-decorators'

const SelectImageContainer = styled.div``
const ImageDisplay = styled.img`
  width: ${props => (props.isFullwidth ? '100%' : '300px')};
  height: auto;
  &:hover {
    cursor: pointer;
  }
`

const WrapperLabel = styled.div`
  display: flex;
  align-items: center;
`

const Label = styled.label`
  color: rgba(0, 0, 0, 0.5);
  font-weight: 600;
  font-size: 13px;
`

@autobind
export default class SelectImage extends PureComponent {
  static propTypes = {
    label: PropTypes.string,
    value: PropTypes.string,
    onChange: PropTypes.func,
    isFullwidth: PropTypes.bool
  }

  state = {
    isUploading: false
  }

  handleClick(e) {
    e.preventDefault()
    if (!this.state.isUploading) {
      this.file.click()
    }
  }

  getFormData() {
    let data = new FormData()
    data.append('file', this.file.files[0])
    return data
  }

  async handleChangeFile(e) {
    if (this.file.files.length === 0) return
    this.setState({ isUploading: true })
    let fileRes = await MediaApi.uploadPhoto(this.getFormData())
    this.props.onChange(fileRes.url.replace('http://', 'https://'))
    this.setState({ isUploading: false })
  }

  handleClear() {
    this.props.onChange('')
  }

  render() {
    return (
      <SelectImageContainer>
        <WrapperLabel>
          <Label>{this.props.label}</Label>
          <Clearfix width={16} />
          {this.state.isUploading && (
            <div>
              <LoaderCircle />
            </div>
          )}
        </WrapperLabel>
        <input
          style={{ display: 'none' }}
          ref={ref => (this.file = ref)}
          type="file"
          onChange={this.handleChangeFile}
        />
        {this.props.value && (
          <div>
            <ImageDisplay
              isFullwidth={this.props.isFullwidth}
              onClick={this.handleClick}
              src={this.props.value}
            />
            <Clearfix height={8} />
          </div>
        )}
        <div>
          <LinkA onClick={this.handleClick}>
            <i className="icon-picture" />{' '}
            {this.props.value ? 'Thay thể hình ảnh' : 'Lựa chọn hình ảnh'}
          </LinkA>
          &nbsp;
          {this.props.value && (
            <LinkA colorType="red" onClick={this.handleClear}>
              {'Xóa'}
            </LinkA>
          )}
        </div>
      </SelectImageContainer>
    )
  }
}
