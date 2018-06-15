import React from 'react'
import PageContainer from 'layout/default-sidebar-layout/PageContainer'
import { Icon, Spin, Modal } from 'antd'
import { autobind } from 'core-decorators'
import StationAutoApi from 'api/StationAuto'
import slug from '/constants/slug'
import createManagerEdit from 'hoc/manager-edit'
import PropTypes from 'prop-types'
import Breadcrumb from '../breadcrumb'
import DynamicTable from 'components/elements/dynamic-table'
import FtpApi from 'api/FtpApi'
import moment from 'moment'

@createManagerEdit({
  apiGetByKey: StationAutoApi.getStationAuto
})
@autobind
export default class StationAutoFtpFile extends React.PureComponent {
  static propTypes = {
    getItem: PropTypes.func,
    isLoaded: PropTypes.bool
  }

  constructor(props) {
    super(props)
    this.state = {
      isLoading: true,
      isFirstDirectory: true,
      isModalShow: false,
      dataSource: [],
      path: '',
      isFullPath: false,
      pagination: {
        page: 1,
        itemPerPage: 10
      },
      breadcrumb: ['list']
    }
  }

  //Su kien truoc khi component duoc tao ra
  async componentWillMount() {
    await this.props.getItem()
    if (this.props.isLoaded && this.props.success) {
      this.setState(
        {
          breadcrumb: [
            ...this.state.breadcrumb,
            {
              id: 'ftpInfo',
              name: this.props.data.name,
              href: slug.stationAuto.ftpFileWithKey + '/' + this.props.data._id,
              path: this.props.data.configLogger.path
            }
          ],
          path: this.props.data.configLogger.path
        },
        () => {
          this.fetchData()
        }
      )
    }
  }

  getRows() {
    let data = this.state.dataSource.map((row, index) => [
      {
        content: (
          <strong>
            {(this.state.pagination.page - 1) *
              this.state.pagination.itemPerPage +
              index +
              1}
          </strong>
        )
      },
      {
        content: this.renderFileName(row)
      },
      {
        content: row.isDirectory ? 'Folder' : 'File'
      },
      {
        content: <div>{moment(row.mtime).format('YYYY/MM/DD HH:mm')}</div>
      },
      {
        content: <div>{Math.round(row.size / 10, 24) / 100 + ' Mb'}</div>
      }
    ])
    if (!this.state.isFirstDirectory && this.state.breadcrumb.length > 2) {
      const backDirectory = [
        { content: '' },
        {
          content: (
            <div style={{ cursor: 'pointer' }} onClick={this.comeBackDirectory}>
              <Icon
                type="folder"
                style={{ backgroundColor: 'yellow', cursor: 'pointer' }}
              />{' '}
              ...
            </div>
          )
        }
      ]
      data = [backDirectory, ...data]
    }

    return data
  }

  comeBackDirectory() {
    this.state.breadcrumb.splice(this.state.breadcrumb.length - 1, 1)
    let isFullPath = this.state.breadcrumb.length > 2 ? true : false
    this.setState(
      {
        path: this.state.breadcrumb[this.state.breadcrumb.length - 1].path,
        isFullPath: isFullPath,
        pagination: {
          page: 1,
          itemPerPage: 10
        }
      },
      () => {
        this.fetchData()
      }
    )
  }

  renderFileName(row) {
    let isTxtFile = row.fileName.includes('.txt')
    return (
      <span
        style={{
          color: isTxtFile ? 'blue' : 'black',
          textDecoration: isTxtFile ? 'underline' : 'auto',
          cursor: isTxtFile || row.isDirectory ? 'pointer' : 'auto'
        }}
        onClick={() => {
          if (isTxtFile) this.infoModal(row.path)
          if (row.isDirectory) {
            this.setState(
              {
                pagination: {
                  ...this.state.pagination,
                  page: 1
                },
                path: row.path,
                isFullPath: true
              },
              () => {
                this.fetchData()

                this.setState({
                  isFirstDirectory: false,
                  breadcrumb: [
                    ...this.state.breadcrumb,
                    {
                      id: row.fileName,
                      name: row.fileName,
                      href:
                        slug.stationAuto.ftpFileWithKey +
                        '/' +
                        this.props.data._id,
                      path: row.path
                    }
                  ]
                })
              }
            )
          }
        }}
      >
        {row.isDirectory && (
          <Icon type="folder" style={{ backgroundColor: 'yellow' }} />
        )}{' '}
        {row.fileName}
      </span>
    )
  }

  getHead() {
    const { t } = this.props.lang
    return [
      { content: '#', width: 2 },
      { content: t('stationAutoManager.ftpFile.fileName'), width: 30 },
      { content: t('stationAutoManager.ftpFile.kind'), width: 30 },
      { content: t('stationAutoManager.ftpFile.modifiedDate'), width: 30 },
      { content: t('stationAutoManager.ftpFile.size'), width: 30 },
      { content: '', width: 20 }
    ]
  }

  async infoModal(path) {
    let res = await FtpApi.getContentFtpFiles(path)
    if (res.success) {
      this.setState(
        {
          content: res.data
        },
        () => {
          Modal.info({
            title: 'FTP File',
            content: this.showContentFtpFile(res.data),
            onOk() {},
            width: 500
          })
        }
      )
    }
  }

  showContentFtpFile(data) {
    return (
      <table>
        <tbody>
          {data.split('\n').map((item, key) => {
            return (
              <tr>
                {item
                  .replace(/\s/g, ' ')
                  .split(' ')
                  .map((itemChild, keyChild) => {
                    let width = 70
                    if (keyChild === 0) width = 120
                    if (keyChild === 3) width = 150
                    return (
                      <td style={{ width: width }} key={keyChild}>
                        {' '}
                        {itemChild}{' '}
                      </td>
                    )
                  })}
              </tr>
            )
          })}
        </tbody>
      </table>
    )
  }

  onChangePage(page, pageSize) {
    this.setState(
      {
        isLoading: true,
        pagination: {
          ...this.state.pagination,
          page: page,
          current: page
        }
      },
      () => {
        this.fetchData()
      }
    )
  }

  async fetchData() {
    this.setState({
      isLoading: true
    })
    const res = await FtpApi.getFtpFiles(this.state.pagination, {
      path: this.state.path,
      isFullPath: this.state.isFullPath
    })
    if (res.success)
      this.setState({
        dataSource: res.data,
        pagination: res.pagination,
        isLoading: false
      })
  }

  render() {
    return (
      <PageContainer {...this.props.wrapperProps}>
        <Breadcrumb items={this.state.breadcrumb} />
        <Spin style={{ width: '100%' }} spinning={!this.props.isLoaded}>
          {this.props.isLoaded &&
            this.props.success && (
              <DynamicTable
                isFixedSize
                isLoading={this.state.isLoading}
                paginationOptions={{
                  isSticky: true
                }}
                head={this.getHead()}
                rows={this.getRows()}
                pagination={this.state.pagination}
                onSetPage={this.onChangePage}
              />
            )}
        </Spin>
      </PageContainer>
    )
  }
}
