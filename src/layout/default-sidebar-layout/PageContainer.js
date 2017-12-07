import React from 'react'
import PropTypes from 'prop-types'
import PageHeader from '@atlaskit/page-header'
import styled from 'styled-components'
import Page, { Grid, GridColumn } from '@atlaskit/page'

const HeaderFlex = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`

export default class PageContainer extends React.PureComponent {
  static propTypes = {
    title: PropTypes.string,
    right: PropTypes.any
  }

  render() {
    return (
      <Page>
        <Grid>
          <GridColumn>
            {this.props.title &&
              <HeaderFlex>
                <PageHeader>{this.props.icon}{this.props.title}</PageHeader>
                {this.props.right}
              </HeaderFlex>}
            {this.props.children}
          </GridColumn>
        </Grid>
      </Page>
    )
  }
}
