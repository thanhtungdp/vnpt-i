import React from 'react'
import styled from 'styled-components'
import { connectAutoDispatch } from 'redux/connect'
import { fetchUserMe } from 'redux/actions/authAction'
import LoaderCircle from 'components/elements/loader-circle'
import { withRouter } from 'react-router-dom'

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
        if (auth.error === true) {
          this.props.history.push('/login')
        }
      }
    }

    render() {
      if (this.props.isAuthenticated && !this.props.isPending) {
        return <Component {...this.props} />
      }
      if (this.props.isPending)
        return (
          <StyledLoading>
            <LoaderCircle /> &nbsp; Loading ...
          </StyledLoading>
        )
      return null
    }
  }

  return ProtectedAuth
}
