import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import Page, { Grid, GridColumn } from '@atlaskit/page'
import BreadcrumbBar from 'shared/breadcrumb/BreadcrumbBar'
import { SHAPE } from 'themes/color'
import Clearfix from 'components/elements/clearfix'

const HeaderFlex = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const BreadcrumbContainer = styled.div`
  padding: 16px 0px;
  background-color: ${SHAPE.GRAYLIGHT};
  height: 68.8px;
`

export default class PageContainer extends React.PureComponent {
  static propTypes = {
    title: PropTypes.string,
    right: PropTypes.any
  }

  render() {
    return (
      <Page>
        <BreadcrumbContainer>
          <Grid>
            <GridColumn>
              <HeaderFlex>
                <BreadcrumbBar />
                {this.props.right}
              </HeaderFlex>
            </GridColumn>
          </Grid>
        </BreadcrumbContainer>
        <Clearfix height={16} />
        <Grid>
          <GridColumn>
            <div className="animated fadeIn">{this.props.children}</div>
          </GridColumn>
        </Grid>
      </Page>
    )
  }
}
