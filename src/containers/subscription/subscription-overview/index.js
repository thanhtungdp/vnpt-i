import React from 'react'
import { autobind } from 'core-decorators'
import styled from 'styled-components'
import PageContainer from 'layout/default-sidebar-layout/PageContainer'
import Button from 'components/elements/button'
import Breadcrumb from '../breadcrumb'
import SubscriptionFormInfo from './SubscriptionFormInfo'
import SubscriptionTableList from './SubscriptionTableList'
import { SHAPE } from 'themes/color'
import { Row, Col } from 'reactstrap'
import { translate } from 'hoc/create-lang'

const SubscriptionOverviewWrapper = styled.div`
  padding: 0px 0px 24px 0px;
`

const HeadingIntro = styled.h4`
  font-size: 16px;
  font-weight: 700;
  margin-bottom: 16px;
  color: ${SHAPE.PRIMARY};
`

const subscriptions = [
  {
    _id: 1,
    subscriptionId: '123133',
    renewAt: '20/12/2018 11:22pm',
    expiredAt: '20/12/2019 11:22pm'
  },
  {
    _id: 2,
    subscriptionId: '123133',
    renewAt: '20/12/2018 11:22pm',
    expiredAt: '20/12/2019 11:22pm'
  }
]

@autobind
export default class SubscriptionOverview extends React.PureComponent {
  rightRenew() {
    return (
      <Button type="primary">{translate('supscriptionStatus.Renew')}</Button>
    )
  }

  render() {
    return (
      <PageContainer
        right={this.rightRenew()}
        {...this.props.wrapperProps}
        backgroundColor="#fff"
      >
        <SubscriptionOverviewWrapper>
          <Breadcrumb items={['base']} />
          <Row>
            <Col md={4}>
              <HeadingIntro>
                {translate('supscriptionStatus.currentSubscription')}
              </HeadingIntro>
              <SubscriptionFormInfo
                expiredAt={new Date().toString()}
                totalUser={10}
                totalStation={20}
              />
            </Col>
            <Col md={8}>
              <HeadingIntro>
                {translate('supscriptionStatus.subscriptionHistory')}
              </HeadingIntro>
              <SubscriptionTableList dataSource={subscriptions} />
            </Col>
          </Row>
        </SubscriptionOverviewWrapper>
      </PageContainer>
    )
  }
}
