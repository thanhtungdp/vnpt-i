import React from 'react'
import PropTypes from 'prop-types'
import { autobind } from 'core-decorators'
import styled from 'styled-components'
import { Icon } from 'antd'
import { Row, Col } from 'reactstrap'
import { SHAPE } from 'themes/color'
import Clearfix from 'components/elements/clearfix'
import createLanguageHoc, { langPropTypes } from 'hoc/create-lang'

const SubscriptionFormInfoWrapper = styled.div``
const Label = styled.label`
  font-weight: 600;
  display: block;
  margin-bottom: 6px;
`
const ValueText = styled.span`
  color: ${SHAPE.GRAYTEXT};
`
@createLanguageHoc
@autobind
export default class SubscriptionFormInfo extends React.PureComponent {
  static propTypes = {
    expiredAt: PropTypes.any,
    totalUser: PropTypes.number,
    totalStation: PropTypes.number,
    lang: langPropTypes
  }

  renderItem(icon, label, value) {
    return (
      <div>
        <Label>
          {icon} {label}
        </Label>
        <ValueText>{value}</ValueText>
      </div>
    )
  }

  render() {
    const { lang: { t } } = this.props
    return (
      <SubscriptionFormInfoWrapper>
        {this.renderItem(
          <Icon type="calendar" />,
          t('supscriptionStatus.expiredAt'),
          this.props.expiredAt
        )}
        <Clearfix height={8} />
        <Row>
          <Col md={6}>
            {this.renderItem(
              <Icon type="user" />,
              t('supscriptionStatus.totalUsers'),
              this.props.totalUser
            )}
          </Col>
          <Col md={6}>
            {this.renderItem(
              <Icon type="inbox" />,
              t('supscriptionStatus.totalStation'),
              this.props.totalStation
            )}
          </Col>
        </Row>
        <Clearfix height={8} />
      </SubscriptionFormInfoWrapper>
    )
  }
}
