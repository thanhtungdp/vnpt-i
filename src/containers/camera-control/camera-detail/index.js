import React, { PureComponent } from 'react'
import PageContainer from 'layout/default-sidebar-layout/PageContainer'
import { autobind } from 'core-decorators'
import Breadcrumb from '../breadcrumb'
import createLanguageHoc from 'hoc/create-lang'
import protectRole from 'hoc/protect-role'
import ROLE from 'constants/role'
import CameraItem from 'components/elements/camera-item'

@protectRole(ROLE.MONITORING.CAMERA)
@createLanguageHoc
@autobind
export default class CameraDetail extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      rtspUrl: '',
      name: '',
      isLoaded: false
    }
  }

  componentWillMount() {
    const key = this.props.match.params.key
    const name = this.props.match.params.name
    if (key)
      this.setState({
        isLoaded: true,
        rtspUrl: decodeURIComponent(key),
        name: decodeURIComponent(name)
      })
  }

  render() {
    return (
      <PageContainer {...this.props.wrapperProps}>
        <Breadcrumb
          items={[
            'list',
            {
              id: 'detail',
              name: this.state.isLoaded ? this.state.name : 'detail'
            }
          ]}
        />
        {this.state.rtspUrl !== '' && (
          <CameraItem
            isFullWidth
            name={this.state.name}
            rtspUrl={this.state.rtspUrl}
            index={1}
          />
        )}
      </PageContainer>
    )
  }
}
