import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { connect } from 'react-redux'
import Page, { Grid, GridColumn } from '@atlaskit/page'
import PageHeader from '@atlaskit/page-header'

class OverviewDashboard extends Component {
  render() {
    return (
      <Page>
        <Grid>
          <GridColumn>
            <PageHeader>Welcome to dashboard login</PageHeader>
          </GridColumn>
        </Grid>
      </Page>
    )
  }
}

export default connect(state => ({
  isAuthenticated: state.auth.isAuthenticated
}))(OverviewDashboard)
