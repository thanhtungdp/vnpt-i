import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { Button, Icon, Form, Menu, Dropdown } from 'antd'
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
import ROLE from 'constants/role'
import protectRole from 'hoc/protect-role'
import styled from 'styled-components'
import TimeAgo from 'react-timeago'
import { Modal, message } from 'antd'

import DynamicTable from 'components/elements/dynamic-table'
const LinkSpan = styled.span`
  color: #000;
  &:hover {
    cursor: pointer;
  }
`
const SpanTimeAgo = styled.div`
  font-size: 13px;
  color: #707070;
`
const Span = styled.span`
  color: ${props => (props.deleted ? '#999999' : '')};
  text-decoration: ${props => (props.deleted ? 'line-through' : '')};
`

const IconButton = styled(Icon)`
  padding-right: 5px;
  color: ${props => (props.color ? props.color : '#3E90F7')};
`

@protectRole(ROLE.STATION_AUTO.VIEW)
@createManagerList({
  apiList: StationAutoApi.getStationAutos
})
@createManagerDelete({
  apiDelete: StationAutoApi.removeStationAuto
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
    onRemoveItem: PropTypes.func,
    fetchData: PropTypes.func,
    onChangeSearch: PropTypes.func,
    data: PropTypes.object,
    lang: langPropTypes
  }

  buttonAdd() {
    const { t } = this.props.lang
    return (
      <div>
        {protectRole(ROLE.STATION_AUTO.CREATE)(
          <Link to={slug.stationAuto.create}>
            <Button type="primary">
              <Icon type="plus" />
              {t('stationAutoManager.create.label')}
            </Button>
          </Link>
        )}
      </div>
    )
  }

  async onDeleteItem(_id, callback) {
    const { lang: { t } } = this.props
    Modal.confirm({
      title: 'Do you want to delete these items?',
      onOk() {
        return new Promise(async (resolve, reject) => {
          const res = await StationAutoApi.deleteStationAuto(_id)
          if (res.success) {
            message.info(t('addon.onDelete.success'))
            callback()
          } else message.error(t('addon.onDelete.error'))
          resolve()
        }).catch(() => console.log('Oops errors!'))
      },
      onCancel() {}
    })
  }

  async onRestoreItem(_id, callback) {
    const { lang: { t } } = this.props
    Modal.confirm({
      title: 'Do you want to restore these items?',
      onOk() {
        return new Promise(async (resolve, reject) => {
          const res = await StationAutoApi.restoreStationAuto(_id)
          if (res.success) {
            message.info(t('addon.onRestore.success'))
            callback()
          } else message.error(t('addon.onRestore.error'))
          resolve()
        }).catch(() => console.log('Oops errors!'))
      },
      onCancel() {}
    })
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
      { content: '#', width: 2 },
      { content: t('stationAutoManager.form.key.label'), width: 15 },
      { content: t('stationAutoManager.form.name.label'), width: 15 },
      { content: t('stationAutoManager.form.address.label'), width: 20 },
      { content: t('stationAutoManager.form.mapLocation.label'), width: 15 },
      { content: t('stationAutoManager.list.createdAt'), width: 10 },
      { content: t('stationAutoManager.list.action'), width: 5 }
    ]
  }

  getRows() {
    let stationTypeArr = []
    //sort dataSource
    let sourceSorted = this.props.dataSource.sort(function(a, b) {
      if (!a.stationType)
        a.stationType = { key: 'NOT SETUP', name: 'NOT SETUP' }
      if (!b.stationType)
        b.stationType = { key: 'NOT SETUP', name: 'NOT SETUP' }
      if (a.stationType.key < b.stationType.key) return -1
      if (a.stationType.key > b.stationType.key) return 1
      return 0
    })

    let stationCount = {}
    for (let i = 0; i < sourceSorted.length; i++) {
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
            content: (
              <strong>
                {(this.props.pagination.page - 1) *
                  this.props.pagination.itemPerPage +
                  index +
                  1}
              </strong>
            )
          },
          {
            content: (
              <Span deleted={row.removeStatus && row.removeStatus.allowed}>
                &emsp;{row.key}
              </Span>
            )
          },
          {
            content: (
              <Span deleted={row.removeStatus && row.removeStatus.allowed}>
                {row.name}
              </Span>
            )
          },
          {
            content: (
              <Span deleted={row.removeStatus && row.removeStatus.allowed}>
                {row.address}
              </Span>
            )
          },
          {
            content: (
              <div>
                <Span deleted={row.removeStatus && row.removeStatus.allowed}>
                  {row.mapLocation.lat} - {row.mapLocation.long}{' '}
                </Span>
              </div>
            )
          },
          {
            content: (
              <SpanTimeAgo>
                <TimeAgo date={row.createdAt} />
              </SpanTimeAgo>
            )
          },
          {
            content: this.actionGroup(row)
          }
        ]
        //check if Group exist or not
        if (row.stationType && stationTypeArr.indexOf(row.stationType.key) > -1)
          return [resultRow]
        else {
          stationTypeArr.push(row.stationType.key)
          return [
            [
              { content: '' },
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

  actionGroup(row) {
    const { lang: { t } } = this.props
    let dropDown = ''
    if (row.removeStatus && row.removeStatus.allowed) {
      dropDown = protectRole(ROLE.STATION_AUTO.DELETE)(
        <Menu
          style={{
            width: 120
          }}
        >
          <Menu.Item key="1">
            <a
              onClick={() => this.onRestoreItem(row._id, this.props.fetchData)}
            >
              <IconButton type="reload" />
              {t('stationAutoManager.list.restore')}
            </a>
          </Menu.Item>
          <Menu.Item key="2">
            <a
              onClick={() =>
                this.props.onRemoveItem(row._id, this.props.fetchData)
              }
            >
              <IconButton type="close-square-o" color={'red'} />
              {t('stationAutoManager.list.remove')}
            </a>
          </Menu.Item>
        </Menu>
      )
    } else {
      dropDown = (
        <Menu
          style={{
            width: 120
          }}
        >
          {protectRole(ROLE.STATION_AUTO.EDIT)(
            <Menu.Item key="1">
              <Link to={slug.stationAuto.editWithKey + '/' + row._id}>
                <IconButton type="edit" />
                {t('stationAutoManager.edit.label')}{' '}
              </Link>
            </Menu.Item>
          )}
          {protectRole(ROLE.STATION_AUTO.DELETE)(
            <Menu.Item key="2">
              <a
                onClick={() => this.onDeleteItem(row._id, this.props.fetchData)}
              >
                <IconButton type="delete" color={'red'} />
                {t('stationAutoManager.delete.label')}
              </a>
            </Menu.Item>
          )}
          {protectRole(ROLE.STATION_AUTO.CONFIG)(
            <Menu.Item key="3">
              <Link to={slug.stationAuto.configWithKey + '/' + row._id}>
                <IconButton type="setting" />
                {t('stationAutoManager.config.label')}{' '}
              </Link>
            </Menu.Item>
          )}
          <Menu.Item key="4">
            <Link to={slug.stationAuto.ftpInfoWithKey + '/' + row._id}>
              <IconButton type="folder-open" />
              {t('stationAutoManager.list.ftpInfo')}{' '}
            </Link>
          </Menu.Item>
          <Menu.Item key="5">
            <Link to={slug.stationAuto.ftpFileWithKey + '/' + row._id}>
              <IconButton type="file-text" />
              {t('stationAutoManager.list.ftpFile')}{' '}
            </Link>
          </Menu.Item>
        </Menu>
      )
    }

    return (
      <Dropdown overlay={dropDown} trigger={['click']}>
        <LinkSpan className="ant-dropdown-link">
          <Icon type="setting" style={{ fontSize: 20, color: '#3E90F7' }} />
        </LinkSpan>
      </Dropdown>
    )
  }

  render() {
    return (
      <PageContainer center={this.renderSearch()} right={this.buttonAdd()}>
        <Breadcrumb items={['list']} />
        <DynamicTable
          isFixedSize
          isLoading={this.props.isLoading}
          paginationOptions={{
            isSticky: true
          }}
          head={this.getHead()}
          rows={this.getRows()}
          pagination={this.props.pagination}
          onSetPage={this.props.onChangePage}
        />
      </PageContainer>
    )
  }
}
