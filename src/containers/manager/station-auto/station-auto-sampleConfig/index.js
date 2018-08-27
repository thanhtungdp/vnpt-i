import React from 'react'
import PageContainer from 'layout/default-sidebar-layout/PageContainer'
import { autobind } from 'core-decorators'
import SampleConfigForm from './SampleConfigForm'
import Breadcrumb from '../breadcrumb'
import createLanguageHoc from 'hoc/create-lang'

// @protectRole(ROLE.STATION_TYPE.CREATE)
@createLanguageHoc
@autobind
export default class StationAutoConfig extends React.PureComponent {

  render() {
    return (
      <PageContainer {...this.props.wrapperProps}>
        <Breadcrumb 
          items={[
            'list',
            {
              id: 'sampleConfig',
              name: this.props.lang.t('stationAutoManager.list.sampleConfig')
            }
          ]}/>
        <SampleConfigForm />
      </PageContainer>
    )
  }
}
