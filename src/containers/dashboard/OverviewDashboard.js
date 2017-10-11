import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Container } from 'reactstrap'
import { connect } from 'react-redux'

const OverviewDashboardContainer = styled.div``

class OverviewDashboard extends PureComponent {
  static propTypes = {}
  render() {
    return (
      <OverviewDashboardContainer>
        <Container>
          <h1>Dashboard After Login</h1>
          {this.props.isAuthenticated
            ? 'Good'
            : 'Bạn chưa đăng nhập, vui lòng đăng nhập'}
        </Container>
      </OverviewDashboardContainer>
    )
  }
}

export default connect(state => ({
  isAuthenticated: state.auth.isAuthenticated
}))(OverviewDashboard)
