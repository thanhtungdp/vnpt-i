import React from 'react'
import { autobind } from 'core-decorators'
import styled from 'styled-components'
import LinkA from 'components/elements/link-a'
import Label from 'components/elements/label'
import Clearfix from 'components/elements/clearfix'
import { Field } from 'redux-form'
import { Row, Col } from 'reactstrap'
import createValidateComponent from 'components/elements/redux-form-validate'
import SelectImage from 'components/elements/select-image'
import InputLabel from 'components/elements/input-label'

const SelectImageListWrapper = styled.div`
  .selectImageItem {
    margin-bottom: 16px;
  }
`
const SelectImageItemWrapper = styled.div`
  border: 1px solid #d4d4d4;
  border-radius: 4px;
  padding: 16px 16px;
`

const Flex = styled.div`
  display: flex;
  justify-content: space-between;
`

const FSelectImage = createValidateComponent(SelectImage)
const FInput = createValidateComponent(InputLabel)

@autobind
export default class SelectImageList extends React.PureComponent {
  handlAddSlider(e) {
    e.preventDefault()
    this.props.fields.push({})
  }

  handleDelete(e, index) {
    e.preventDefault()
    this.props.fields.remove(index)
  }

  render() {
    return (
      <SelectImageListWrapper>
        <div>
          <Label>Danh sách hình ảnh</Label>
        </div>
        <Row>
          {this.props.fields.map((slider, index) => (
            <Col md={6} key={index}>
              <SelectImageItemWrapper className="selectImageItem">
                <Flex>
                  <Label>{index + 1}</Label>
                  <LinkA
                    onClick={e => this.handleDelete(e, index)}
                    colorType="red"
                  >
                    Xóa
                  </LinkA>
                </Flex>
                <Row>
                  <Col md={6}>
                    <Field
                      placeholder="Tên ảnh"
                      component={FInput}
                      name={`${slider}.name`}
                    />
                  </Col>
                  <Col md={6}>
                    <Field
                      placeholder="Mô tả"
                      component={FInput}
                      name={`${slider}.description`}
                    />
                  </Col>
                </Row>
                <Clearfix height={16} />
                <Field
                  placeholder="Đường dẫn"
                  component={FInput}
                  name={`${slider}.url`}
                />
                <Clearfix height={16} />
                <Field
                  component={FSelectImage}
                  isFullwidth
                  name={`${slider}.image`}
                />
              </SelectImageItemWrapper>
            </Col>
          ))}
        </Row>
        <LinkA onClick={this.handlAddSlider}>Thêm ảnh</LinkA>
      </SelectImageListWrapper>
    )
  }
}
