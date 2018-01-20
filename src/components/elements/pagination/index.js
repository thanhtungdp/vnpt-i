import React from 'react'
import Pagination from '@atlaskit/pagination'
import PropTypes from 'prop-types'
import { Sticky } from 'react-sticky'
import styled from 'styled-components'

const PaginationWrapper = styled.div`
  background-color: #ffffff;
  padding: 8px 0px;
  display: flex;
  justify-content: center;
  .euztmF {
    justify-content: center;
  }
`

export default class PaginationWithSticky extends React.Component {
  static propTypes = {
    totalItem: PropTypes.number,
    itemPerPage: PropTypes.number,
    page: PropTypes.number,
    onChange: PropTypes.number,
    isSticky: PropTypes.number,
    stickyOptions: PropTypes.object
  }

  static defaultProps = {
    stickyOptions: {}
  }

  render() {
    const {
      totalItem,
      itemPerPage,
      onChange,
      page,
      isSticky,
      stickyOptions
    } = this.props
    const paginationComponent = (
      <Pagination
        total={parseInt(totalItem / itemPerPage, 10)}
        current={page}
        onSetPage={onChange}
      />
    )
    return isSticky ? (
      <Sticky {...stickyOptions}>
        {props => (
          <div style={{ ...props.style, top: 'none', bottom: '0px' }}>
            <PaginationWrapper>{paginationComponent}</PaginationWrapper>
          </div>
        )}
      </Sticky>
    ) : (
      paginationComponent
    )
  }
}
