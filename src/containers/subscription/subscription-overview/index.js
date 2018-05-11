import React from 'react'
import { autobind } from 'core-decorators'
import styled from 'styled-components'
import PageContainer from 'layout/default-sidebar-layout/PageContainer'
import Button from 'components/elements/button'
import Breadcrumb from '../breadcrumb'
import SubscriptionFormInfo from './SubscriptionFormInfo'
import { SHAPE } from 'themes/color'
import { Row, Col } from 'reactstrap'
import { translate } from 'hoc/create-lang'
import OrganizationApi from 'api/OrganizationApi'
import UserApi from 'api/UserApi'
import StationAutoApi from 'api/StationAuto'
import moment from 'moment/moment'

const SubscriptionOverviewWrapper = styled.div`
  padding: 0px 0px 24px 0px;
`

const HeadingIntro = styled.h4`
  font-size: 16px;
  font-weight: 700;
  margin-bottom: 16px;
  color: ${SHAPE.PRIMARY};
`

@autobind
export default class SubscriptionOverview extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      name: '',
      expiredAt: '',
      totalUser: 0,
      totalStation: 0,
      createdUser: 0,
      createdStation: 0,
      isLoaded: false
    }
  }

  rightRenew() {
    return (
      <Button type="primary">{translate('subscriptionStatus.Renew')}</Button>
    )
  }

  async getStationCount() {
    const record = await StationAutoApi.getTotalCount()
    if (record.success) {
      this.setState({
        createdStation: record.data
      })
    }
  }

  async getUserCount() {
    const record = await UserApi.getTotalCount()
    if (record.success) {
      this.setState({
        createdUser: record.data
      })
    }
  }

  async componentDidMount() {
    const record = await OrganizationApi.getSubscription()
    const { name, packageInfo } = record.data
    this.setState({
      name: name,
      isLoaded: true
    })
    if (packageInfo) {
      const { expiredAt, totalUser, totalStation } = packageInfo
      this.setState({
        expiredAt: moment(new Date(expiredAt)).format('YYYY-MM-DD HH:mm'),
        totalUser: totalUser,
        totalStation: totalStation
      })
    }
    this.getUserCount()
    this.getStationCount()
  }

  render() {
    return (
      <PageContainer
        right={this.rightRenew()}
        {...this.props.wrapperProps}
        backgroundColor="#fff"
      >
        {this.state.isLoaded && (
          <SubscriptionOverviewWrapper>
            <Breadcrumb items={['base']} />
            <Row>
              <Col md={4}>
                <HeadingIntro>{this.state.name}</HeadingIntro>
                <SubscriptionFormInfo
                  expiredAt={this.state.expiredAt}
                  totalUser={this.state.totalUser}
                  totalStation={this.state.totalStation}
                  createdUser={this.state.createdUser}
                  createdStation={this.state.createdStation}
                />
              </Col>
            </Row>
          </SubscriptionOverviewWrapper>
        )}
      </PageContainer>
    )
  }
}
