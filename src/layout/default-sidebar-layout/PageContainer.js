import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import Page from '@atlaskit/page'
import BreadcrumbBar from 'shared/breadcrumb/BreadcrumbBar'
import { SHAPE } from 'themes/color'
import Clearfix from 'components/elements/clearfix'
import { StickyContainer, Sticky } from 'react-sticky'

const HeaderFlex = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`

export const Grid = styled.div`
  width: 95%;
  margin-left: auto;
  margin-right: auto;
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

  renderHeader() {
    return (
      <Sticky>
        {props => (
          <div
            style={{
              ...props.style,
              top: 0,
              zIndex: 2,
              borderBottom: props.isSticky ? '1px solid #eeeeee' : ''
            }}
          >
            <BreadcrumbContainer>
              <Grid>
                <HeaderFlex>
                  <BreadcrumbBar />
                  {this.props.center}
                  {this.props.right}
                </HeaderFlex>
              </Grid>
            </BreadcrumbContainer>
          </div>
        )}
      </Sticky>
    )
  }

  render() {
    return (
      <StickyContainer>
        <Page>
          {this.renderHeader()}
          {this.props.headerBottom}
          <Clearfix height={16} />
          <Grid>
            <div className="animated fadeIn">{this.props.children}</div>
          </Grid>
        </Page>
      </StickyContainer>
    )
  }
}
