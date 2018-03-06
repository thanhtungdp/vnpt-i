import React from 'react'
import { Form, Input, Button, Row, Col, Checkbox, Upload, Icon, Modal } from 'antd'
import PropTypes from 'prop-types'
import { autobind } from 'core-decorators'
import { mapPropsToFields } from 'utils/form'
import { STATION_TYPE_API } from 'config'
import createLanguageHoc, { langPropTypes } from 'hoc/create-lang'
import swal from 'sweetalert2'

const FormItem = Form.Item

const urlUpdate = STATION_TYPE_API + '/station-type/upload'

@Form.create({
  mapPropsToFields: mapPropsToFields
})
@createLanguageHoc
@autobind
export default class StationTypeForm extends React.PureComponent {
  static propTypes = {
    onSubmit: PropTypes.func,
    lang: langPropTypes
  }

  constructor(props) {
    super(props)
    this.state = {
      previewVisible: false,
      previewImage: '',
      largeImgList: [],
      normalImgList: [],
      smallImgList: []
    }
  }

  handleSubmit(e) {
    e.preventDefault()
    this.props.form.validateFields((err, values) => {
      if (err) return
      const data = {
        key: values.key,
        name: values.name,
        isAuto: values.isAuto,
        files: {},
        icon: {
          large: this.state.largeImgList.length > 0 ? this.state.largeImgList[0].response : null,
          normal: this.state.normalImgList.length > 0 ? this.state.normalImgList[0].response : null,
          small: this.state.smallImgList.length > 0 ? this.state.smallImgList[0].response : null
        }
      }
      // Callback submit form Container Component
      this.props.onSubmit(data)
    })
  }

  handlePreview = (file) => {
    this.setState({
      previewImage: file.url || file.thumbUrl,
      previewVisible: true,
    });
  }


  handleCancel = () => {
    this.setState({ previewVisible: false })
  }

  handleImageChange(type, fileList, file, event) {
    for (var i = 0; i < fileList.length; i++) {
      if (fileList[i].thumbUrl != '') {
        fileList[i].status = 'done'
      }
    }

    //error
    if (file.status == 'error') {
      fileList = []
      swal({
        title: 'upload image fail',
        type: 'error'
      })
    }

    this.setState({ [type + 'ImgList']: fileList })
  }

  renderButtonUpload(name) {
    return <div>
      <Icon type="plus" />
      <div className="ant-upload-text">{name}</div>
    </div>
  }

  async componentWillMount() {
    if (this.props.initialValues == null)
      return
    if (this.props.initialValues.icon == null)
      return

    //Set image Icon
    let largeImgList = []
    let normalImgList = []
    let smallImgList = []
    if (this.props.initialValues.icon.large != null && this.props.initialValues.icon.large.file)
      largeImgList.push({
        uid: -1,
        url: this.props.initialValues.icon.large.url,
        name: this.props.initialValues.icon.large.file.originalname,
        status: 'done',
      })
    if (this.props.initialValues.icon.normal != null && this.props.initialValues.icon.normal.file)
      normalImgList.push({
        uid: -1,
        url: this.props.initialValues.icon.normal.url,
        name: this.props.initialValues.icon.normal.file.originalname,
        status: 'done',
      })
    if (this.props.initialValues.icon.small != null && this.props.initialValues.icon.small.file)
      smallImgList.push({
        uid: -1,
        url: this.props.initialValues.icon.small.url,
        name: this.props.initialValues.icon.small.file.originalname,
        status: 'done',
      })

    this.setState({
      largeImgList: largeImgList,
      normalImgList: normalImgList,
      smallImgList: smallImgList
    })

  }

  render() {
    const { getFieldDecorator } = this.props.form
    const { t } = this.props.lang
    const { previewVisible, previewImage, fileList } = this.state;
    return (
      <Form onSubmit={this.handleSubmit}>
        <Row gutter={16}>
          <Col span={12}>
            <FormItem label={t('stationTypeManager.form.key.label')}>
              {getFieldDecorator('key', {
                rules: [
                  {
                    required: true,
                    message: t('stationTypeManage.form.key.error')
                  }
                ]
              })(
                <Input placeholder={t('stationTypeManager.form.key.label')} />
                )}
            </FormItem>
          </Col>
          <Col span={12}>
            <FormItem label={t('stationTypeManager.form.name.label')}>
              {getFieldDecorator('name', {
                rules: [
                  {
                    required: true,
                    message: t('stationTypeManage.form.name.error')
                  }
                ]
              })(
                <Input placeholder={t('stationTypeManager.form.name.label')} />
                )}
            </FormItem>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={12}>
            <FormItem label={t('stationTypeManager.form.icon.label')}>
              <Col span={6}>
                <div className="dropbox">
                  <Upload
                    action='http://localhost:1234/photo/uploadWithDirectory/station-types'
                    listType="picture-card"
                    fileList={this.state.largeImgList}
                    onPreview={this.handlePreview}
                    onChange={({ fileList, file, event }) => {
                      this.handleImageChange('large', fileList, file, event)
                    }}
                  >
                    {this.state.largeImgList.length >= 1 ? null : this.renderButtonUpload('Large')}
                  </Upload>
                  <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
                    <img alt="example" style={{ width: '100%' }} src={previewImage} />
                  </Modal>
                </div>
              </Col>
              <Col span={6}>
                <div className="dropbox">
                  <Upload
                    action='http://localhost:1234/photo/uploadWithDirectory/station-types'
                    listType="picture-card"
                    fileList={this.state.normalImgList}
                    onPreview={this.handlePreview}
                    onChange={({ fileList, file, event }) => {
                      this.handleImageChange('normal', fileList, file, event)
                    }}
                  >
                    {this.state.normalImgList.length >= 1 ? null : this.renderButtonUpload('Normal')}
                  </Upload>
                </div>
              </Col>
              <Col span={6}>
                <div className="dropbox">
                  <Upload
                    action='http://localhost:1234/photo/uploadWithDirectory/station-types'
                    listType="picture-card"
                    fileList={this.state.smallImgList}
                    onPreview={this.handlePreview}
                    onChange={({ fileList, file, event }) => {
                      this.handleImageChange('small', fileList, file, event)
                    }}
                  >
                    {this.state.smallImgList.length >= 1 ? null : this.renderButtonUpload('Small')}
                  </Upload>
                </div>
              </Col>
            </FormItem>
          </Col>
          <Col span={12}>
            <FormItem label={t('stationTypeManager.form.auto.label')}>
              {getFieldDecorator('isAuto')(<Checkbox />)}
            </FormItem>
          </Col>
        </Row>
        <FormItem>
          <Button style={{ width: '100%' }} type="primary" htmlType="submit">
            Save
          </Button>
        </FormItem>
      </Form>
    )
  }
}
