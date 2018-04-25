import React from 'react'
import { autobind } from 'core-decorators'
import styled from 'styled-components'

const LoaderFullScreenWrapper = styled.div`
  position: absolute;
  top: 0px;
  right: 0px;
`

@autobind
export default class LoaderFullScreen extends React.PureComponent {
  render() {
    return <LoaderFullScreenWrapper />
  }
}
