import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import BreadcrumbBar from 'shared/breadcrumb/BreadcrumbBar'
import { SHAPE } from 'themes/color'
import Clearfix from 'components/elements/clearfix'
import { StickyContainer, Sticky } from 'react-sticky'
import LoaderCircle from 'components/elements/loader-circle'

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

const PageBodyWrapper = styled.div`
  background-color: ${props => (props.color ? props.color : '#ffffff')};
  flex: 1 1 auto;
  position: relative;
  z-index: 1;
`

const AbsoluteLoading = styled.div`
  position: absolute;
  top: 0px;
  right: 0px;
  bottom: 0px;
  left: 0px;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`

export default class PageContainer extends React.PureComponent {
  static propTypes = {
    title: PropTypes.string,
    backgroundColor: PropTypes.string,
    hideTitle: PropTypes.bool,
    isLoading: PropTypes.bool,
    headerCustom: PropTypes.any,
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
                {this.props.headerCustom ? (
                  this.props.headerCustom
                ) : (
                  <HeaderFlex>
                    <BreadcrumbBar />
                    {this.props.center}
                    {this.props.right}
                  </HeaderFlex>
                )}
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
        <PageBodyWrapper color={this.props.backgroundColor}>
          <style
            type="text/css"
            dangerouslySetInnerHTML={{
              __html: 'body{background-color: #fafbfb;}'
            }}
          />
          {!this.props.hideTitle ? this.renderHeader() : null}
          {this.props.headerBottom}
          <Clearfix height={16} />
          {!this.props.isLoading &&<Grid>
            <div className="animated fadeIn">{this.props.children}</div>
          </Grid>}
          {this.props.isLoading && <AbsoluteLoading>
            <LoaderCircle/>
          </AbsoluteLoading>}
        </PageBodyWrapper>
      </StickyContainer>
    )
  }
}
