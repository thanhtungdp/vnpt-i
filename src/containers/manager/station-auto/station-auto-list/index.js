import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { Divider, Button, Icon, Form } from 'antd'
import StationAutoApi from 'api/StationAuto'
import PageContainer from 'layout/default-sidebar-layout/PageContainer'
import slug from 'constants/slug'
import { autobind } from 'core-decorators'
import createManagerList from 'hoc/manager-list'
import createManagerDelete from 'hoc/manager-delete'
import { mapPropsToFields } from 'utils/form'
import createLanguageHoc, { langPropTypes } from 'hoc/create-lang'
import StationAutoSearchForm from '../station-auto-search'
import Breadcrumb from '../breadcrumb'
// import Heading from 'components/elements/heading'
// import { getStationTypes } from 'api/CategoryApi'
// import { getStationAutos } from 'api/StationAuto'

import DynamicTable from 'components/elements/dynamic-table'

@createManagerList({
  apiList: StationAutoApi.getStationAutos
})
@createManagerDelete({
  apiDelete: StationAutoApi.deleteStationAuto
})
@Form.create({
  mapPropsToFields: mapPropsToFields
})
@createLanguageHoc
@autobind
export default class StationAutoList extends React.Component {
  static propTypes = {
    dataSource: PropTypes.array,
    isLoading: PropTypes.bool,
    pagination: PropTypes.object,
    onChangePage: PropTypes.func,
    onChangePageSize: PropTypes.func,
    onDeleteItem: PropTypes.func,
    fetchData: PropTypes.func,
    onChangeSearch: PropTypes.func,
    data: PropTypes.object,
    lang: langPropTypes
  }

  buttonAdd() {
    return (
      <div>
        <Link to={slug.stationAuto.create}>
          <Button type="primary">
            <Icon type="plus" />Create
          </Button>
        </Link>
      </div>
    )
  }

  renderSearch() {
    return (
      <StationAutoSearchForm
        onChangeSearch={this.props.onChangeSearch}
        initialValues={this.props.data}
      />
    )
  }

  getHead() {
    const { t } = this.props.lang
    return [
      { content: t('stationAutoManager.form.key.label'), width: 15 },
      { content: t('stationAutoManager.form.name.label'), width: 30 },
      { content: t('stationAutoManager.form.address.label'), width: 30 },
      { content: '', width: 20 }
    ]
  }

  getRows() {
    let stationTypeArr = []
    //sort dataSource
    let sourceSorted = this.props.dataSource.sort(function(a, b) {
      if (a.stationType.key < b.stationType.key) return -1
      if (a.stationType.key > b.stationType.key) return 1
      return 0
    })

    let stationCount = {}
    for (var i = 0; i < sourceSorted.length; i++) {
      stationCount[sourceSorted[i].stationType.key] = stationCount[
        sourceSorted[i].stationType.key
      ]
        ? stationCount[sourceSorted[i].stationType.key] + 1
        : 1
    }

    //logic return groupRow or groupRow and Row
    let result = [].concat.apply(
      [],
      sourceSorted.map((row, index) => {
        //content Row
        let resultRow = [
          {
            content: <span>&emsp;{row.key}</span>
          },
          {
            content: <span>{row.name}</span>
          },
          {
            content: <span>{row.address}</span>
          },
          {
            content: (
              <div>
                <span>
                  <Link to={slug.stationAuto.editWithKey + '/' + row._id}>
                    {' '}
                    Edit{' '}
                  </Link>
                  <Divider type="vertical" />
                  <a
                    onClick={() =>
                      this.props.onDeleteItem(row._id, this.props.fetchData)
                    }
                  >
                    Delete
                  </a>
                  <Divider type="vertical" />
                  <Link to={slug.stationAuto.configWithKey + '/' + row._id}>
                    {' '}
                    Config{' '}
                  </Link>
                </span>
              </div>
            )
          }
        ]
        //check if Group exist or not
        if (row.stationType && stationTypeArr.indexOf(row.stationType.key) > -1)
          return [resultRow]
        else {
          stationTypeArr.push(row.stationType.key)
          return [
            [
              {
                content: (
                  <div>
                    <strong>
                      {row.stationType.name}{' '}
                      {stationCount[row.stationType.key]
                        ? '(' + stationCount[row.stationType.key] + ')'
                        : ''}
                    </strong>
                  </div>
                )
              }
            ],
            resultRow
          ]
        }
      })
    )
    return result
  }

  render() {
    return (
      <PageContainer center={this.renderSearch()} right={this.buttonAdd()}>
        <Breadcrumb items={['list']} />
        <DynamicTable
          isFixedSize
          head={this.getHead()}
          rows={this.getRows()}
          pagination={this.props.pagination}
          onSetPage={this.props.onChangePage}
          isLoading={this.props.isLoading}
        />
      </PageContainer>
    )
  }
}
