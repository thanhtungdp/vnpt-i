import React from 'react'
import styled from 'styled-components'
import { connectAutoDispatch } from 'redux/connect'
import { fetchUserMe } from 'redux/actions/authAction'
import { withRouter } from 'react-router-dom'
import Spinner from '@atlaskit/spinner'

const StyledLoading = styled.div`
  position: fixed;
  top: 0px;
  left: 0px;
  bottom: 0px;
  right: 0px;
  display: flex;
  justify-content: center;
  align-items: center;
`

export default function createProtectedAuth(Component) {
  @withRouter
  @connectAutoDispatch(
    state => ({
      isAuthenticated: state.auth.isAuthenticated,
      isPending: state.auth.isPending,
      isFail: state.auth.isFail
    }),
    { fetchUserMe }
  )
  class ProtectedAuth extends React.Component {
    async componentWillMount() {
      if (!this.props.isAuthenticated) {
        const auth = await this.props.fetchUserMe()
        if (auth.error) {
          this.props.history.push('/login')
        }
      }
    }

    render() {
      if (this.props.isAuthenticated && !this.props.isPending) {
        return <Component {...this.props} />
      }
      return (
        <StyledLoading>
          <Spinner size="medium" />
        </StyledLoading>
      )
    }
  }
  return ProtectedAuth
}
