import React from 'react'
import PropTypes from 'prop-types'
import PageHeader from '@atlaskit/page-header'
import Page, { Grid, GridColumn } from '@atlaskit/page'

export default class PageContainer extends React.PureComponent {
  static propTypes = {
    title: PropTypes.string
  }
  render() {
    return (
      <Page>
        <Grid>
          <GridColumn>
            {this.props.title &&
              <PageHeader>{this.props.icon}{this.props.title}</PageHeader>}
            {this.props.children}
          </GridColumn>
        </Grid>
      </Page>
    )
  }
}
