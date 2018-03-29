import React from 'react'
import {
  Form,
  Input,
  Button,
  Row,
  Col,
  Select,
  Icon,
  Checkbox,
  Upload,
  Modal
} from 'antd'
import PropTypes from 'prop-types'
import { autobind } from 'core-decorators'
import { mapPropsToFields } from 'utils/form'
import CategoryApi from 'api/CategoryApi'
import SelectStationType from 'components/elements/select-station-type'
import createLanguageHoc, { langPropTypes } from '../../../../hoc/create-lang'
import MediaApi from 'api/MediaApi'
import swal from 'sweetalert2'
import MeasuringTable from '../station-auto-formTable/'

const FormItem = Form.Item

@Form.create({
  mapPropsToFields: mapPropsToFields
})
@createLanguageHoc
@autobind
export default class StationAutoForm extends React.PureComponent {
  static propTypes = {
    onSubmit: PropTypes.func,
    isEdit: PropTypes.bool,
    initialValues: PropTypes.object,
    lang: langPropTypes
  }

  constructor(props) {
    super(props)
    this.state = {
      stationType: {},
      stationTypes: [],
      measuringList: [],
      measuringListSource: [],
      measuringOps: [],
      options: {},
      phones: [],
      emails: [],

      previewVisible: false,
      previewImage: '',
      fileList: [],
      imgList: []
    }
    const { t } = this.props.lang
    const { getFieldDecorator } = this.props.form
  }

  async componentWillMount() {
    const measuringList = await CategoryApi.getMeasurings(
      { page: 1, itemPerPage: 100000 },
      {}
    )

    this.setState({
      measuringListSource: measuringList.data,
    })
    if (this.props.initialValues) {
      let fileList = []
      if (this.props.initialValues.image) {
        //set image display
        let img = this.props.initialValues.image
        fileList.push({
          uid: -1,
          url: img.url,
          name: img.file.originalname,
          status: 'done'
        })
      }

      this.setState({
        emails: this.props.initialValues.emails,
        phones: this.props.initialValues.phones,
        measuringList: this.props.initialValues.measuringList,
        stationType: this.props.initialValues.objStationType,
        options: this.props.initialValues.options
          ? this.props.initialValues.options
          : {},
        fileList: fileList
      })
    }
  }

  handleChange(value, key, column) {
    const newData = [...this.state.measuringList]
    const target = newData.filter(item => key === item.key)[0]
    if (target) {
      target[column] = value
      this.setState({ measuringList: newData })
    }
  }

  handleSubmit(e) {
    e.preventDefault()
    this.props.form.validateFields((err, values) => {
      if (err) return
      const data = {
        key: values.key,
        name: values.name,
        mapLocation: { long: values.long, lat: values.lat },
        address: values.address,
        emails: this.state.emails,
        phones: this.state.phones,
        stationType: this.state.stationType,
        measuringList: values.measuringList,
        options: this.state.options,
        image: this.state.imgList.length > 0 ? this.state.imgList[0] : null
      }
      // Callback submit form Container Component
      this.props.onSubmit(data)
    })
  }

  changeStationType(stationType) {
    this.setState({ stationType: stationType })
  }

  onOptionChange(checkedValues) {
    this.setState({
      options: {
        ...this.state.options,
        [checkedValues.target.value]: checkedValues.target.checked
      }
    })
  }

  handlePreview = file => {
    this.setState({
      previewImage: file.url || file.thumbUrl,
      previewVisible: true
    })
  }

  handleCancel = () => {
    this.setState({ previewVisible: false })
  }

  handleImageChange = ({ fileList, file, event }) => {
    for (var i = 0; i < fileList.length; i++) {
      if (fileList[i].response)
        fileList[i].status = 'done'
      else
        fileList[i].status = 'uploading'
    }

    const imgList = this.state.fileList
      .filter(img => img.response)
      .map(img => img.response)

    if (file.response !== null && imgList.length > 0) {
      this.setState({
        fileList: fileList,
        imgList: imgList
      })
    }

    //error
    if (file.status === 'error') {
      fileList = []
      swal({
        title: 'upload image fail',
        type: 'error'
      })
    }

    this.setState({ fileList: fileList })
  }

  handleEmailsChange(value) {
    this.setState({
      emails: value
    })
  }
  handlePhonesChange(value) {
    this.setState({
      phones: value
    })
  }

  render() {
    const urlPhotoUpload = MediaApi.urlPhotoUploadWithDirectory('station-autos')
    const { previewVisible, previewImage, fileList } = this.state
    const uploadButton = (
      <div>
        <Icon type="plus" />
        <div className="ant-upload-text">Upload</div>
      </div>
    )

    const { getFieldDecorator } = this.props.form
    const { t } = this.props.lang
    return (
      <Form onSubmit={this.handleSubmit}>
        <Row gutter={8}>
          <Col span={12}>
            <FormItem label={t('stationAutoManager.form.key.label')}>
              {getFieldDecorator('key', {
                rules: [
                  {
                    required: true,
                    message: t('stationManager.form.key.error')
                  }
                ]
              })(
                <Input
                  disabled={this.props.isEdit}
                  placeholder={t('stationAutoManager.form.key.placeholder')}
                />
                )}
            </FormItem>
          </Col>
          <Col span={12}>
            <FormItem label={t('stationAutoManager.form.name.label')}>
              {getFieldDecorator('name', {
                rules: [{ required: true, message: 'Please enter value!' }]
              })(
                <Input
                  placeholder={t('stationAutoManager.form.name.placeholder')}
                />
                )}
            </FormItem>
          </Col>
        </Row>
        <Row gutter={8}>
          <Col span={12}>
            <FormItem label={t('stationAutoManager.form.long.label')}>
              {getFieldDecorator('long', {
                rules: [{ required: true, message: 'please enter value!' }]
              })(
                <Input
                  placeholder={t('stationAutoManager.form.long.placeholder')}
                />
                )}
            </FormItem>
          </Col>
          <Col span={12}>
            <FormItem label={t('stationAutoManager.form.lat.label')}>
              {getFieldDecorator('lat', {
                rules: [{ required: true, message: 'please enter value!' }]
              })(
                <Input
                  placeholder={t('stationAutoManager.form.lat.placeholder')}
                />
                )}
            </FormItem>
          </Col>
        </Row>
        <Row gutter={8}>
          <Col span={12}>
            <FormItem label={t('stationAutoManager.form.address.label')}>
              {getFieldDecorator('address')(
                <Input
                  placeholder={t('stationAutoManager.form.address.placeholder')}
                />
              )}
            </FormItem>
          </Col>
          <Col span={12}>
            <FormItem label={t('stationAutoManager.form.stationType.label')}>
              {getFieldDecorator('stationType', {
                initialValue: this.props.initialValues
                  ? this.props.initialValues.stationType.key
                  : '',
              })(
                <SelectStationType
                  label={t('stationAutoManager.form.stationType.label')}
                  placeholder={t('stationAutoManager.form.stationType.placeholder')}
                  onHandleChange={this.changeStationType}
                />
                )}
            </FormItem>
          </Col>
        </Row>
        <Row gutter={8}>
          <Col span={12}>
            <div className={"ant-row ant-form-item"}>
              <div className="ant-form-item-label"><label htmlFor="phones" title="Phones">Emails</label></div>
              <Select
                mode="tags"
                placeholder={t('stationAutoManager.form.emails.placeholder')}
                defaultValue={this.props.initialValues ? this.props.initialValues.emails : []}
                onChange={this.handleEmailsChange}
              />
            </div>
          </Col>
          <Col span={12}>
            <div className={"ant-row ant-form-item"}>
              <div className="ant-form-item-label"><label htmlFor="phones" className="" title="Phones">Phones</label></div>
              <Select
                mode="tags"
                placeholder={t('stationAutoManager.form.phones.placeholder')}
                defaultValue={this.props.initialValues ? this.props.initialValues.phones : []}
                onChange={this.handlePhonesChange}
              />
            </div>
          </Col>
        </Row>
        <Row gutter={8}>
          <Col span={24} />
        </Row>

        <Row>
          <Col span={8}>
            <Checkbox
              value="isAllowWarning"
              onChange={this.onOptionChange}
              checked={this.state.options.isAllowWarning}
            >
              {t('stationAutoManager.form.options.isAllowWarning')}
            </Checkbox>
          </Col>
          <Col span={8}>
            <Checkbox
              value="isAllowRemote"
              onChange={this.onOptionChange}
              checked={this.state.options.isAllowRemote}
            >
              {t('stationAutoManager.form.options.isAllowRemote')}
            </Checkbox>
          </Col>
        </Row>

        <Row gutter={8}>
          <Col span={24}>
            <Upload
              action={urlPhotoUpload}
              listType="picture-card"
              fileList={fileList}
              onPreview={this.handlePreview}
              onChange={this.handleImageChange}
            >
              {fileList.length >= 1 ? null : uploadButton}
            </Upload>
            <Modal
              visible={previewVisible}
              footer={null}
              onCancel={this.handleCancel}
            >
              <img alt="example" style={{ width: '100%' }} src={previewImage} />
            </Modal>
          </Col>
        </Row>
        <MeasuringTable
          lang={this.props.lang}
          form={this.props.form}
          dataSource={this.props.initialValues ? this.props.initialValues.measuringList : []}
          measuringListSource={this.state.measuringListSource}
        ></MeasuringTable>
        <FormItem>
          <Button style={{ width: '100%' }} type="primary" htmlType="submit">
            {t('addon.save')}
          </Button>
        </FormItem>
      </Form>
    )
  }
}
