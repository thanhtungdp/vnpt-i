import React, { PureComponent } from 'react'
import styled from 'styled-components'
import { Table, Checkbox } from 'antd'
import PropTypes from 'prop-types'
import { autobind } from 'core-decorators'
import update from 'react-addons-update'
import createLanguage, { langPropTypes } from 'hoc/create-lang'
import AuthApi from 'api/AuthApi'

const View = styled.div``

@createLanguage
@autobind
export default class CheckBoxRole extends PureComponent {
  static propTypes = {
    onChange: PropTypes.func,
    lang: langPropTypes,
    dataItems: PropTypes.object
  }

  state = {
    menu: {},
    dataMenus: []
  }

  async componentWillMount() {
    let record = await AuthApi.getMe()
    record.data.organization.menu = {
      dashboard: {
        actions: {
          view: true
        },
        description: 'dashboard'
      },
      monitoring: {
        actions: {
          view: true,
          camera: true,
          control: true
        },
        description: 'monitoring'
      },
      map: {
        actions: {
          view: true
        },
        description: 'map'
      }
    }
    let initialValues
    if (this.props.value) {
      initialValues = Object.assign({}, this.props.value[0])
    }
    const arr = Object.keys(record.data.organization.menu).map(key => ({
      key: key,
      ...record.data.organization.menu[key]
    }))

    this.setState(
      {
        menu: this.props.value ? initialValues : record.data.organization.menu,
        dataMenus: arr
      },
      () => {
        this.handleCheckChange()
      }
    )
  }

  async onChangeMenu(e, menuName) {
    this.setState(
      {
        menu: {
          ...this.state.menu,
          [menuName]: e.target.checked
            ? {
                actions: {},
                description: menuName
              }
            : undefined
        }
      },
      () => {
        this.handleCheckChange()
      }
    )
  }

  async onChangeRule(e, menuName, actionName) {
    this.setState(
      update(this.state, {
        menu: {
          [menuName]: {
            actions: {
              [actionName]: {
                $set: e.target.checked
              }
            }
          }
        }
      }),
      () => {
        this.handleCheckChange()
      }
    )
  }

  getColumns() {
    const { lang: { t } } = this.props
    return [
      {
        title: t('organization.rule.menu.label'),
        dataIndex: 'key',
        key: 'key',
        render: (text, record) => {
          return (
            <Checkbox
              onChange={e => {
                this.onChangeMenu(e, record.key)
              }}
              checked={this.state.menu[record.key] ? true : false}
            >
              {text}
            </Checkbox>
          )
        }
      },
      {
        title: t('organization.rule.action.label'),
        key: 'action',
        render: (text, record) => {
          const objActions = this.state.dataMenus.find(function(item) {
            return item.key === record.key
          })

          const arrActions = Object.keys(objActions.actions)
          const actionsOrganization =
            this.state.menu &&
            this.state.menu[record.key] &&
            this.state.menu[record.key].actions
              ? this.state.menu[record.key].actions
              : {}

          return arrActions.map((actionName, index) => {
            return (
              record.actions[actionName] && (
                <Checkbox
                  key={index}
                  onChange={e => {
                    this.onChangeRule(e, record.key, actionName)
                  }}
                  checked={actionsOrganization[actionName]}
                  disabled={
                    this.state.menu ? !this.state.menu[record.key] : true
                  }
                >
                  {actionName}
                </Checkbox>
              )
            )
          })
        }
      }
    ]
  }

  handleCheckChange() {
    this.props.onChange([this.state.menu])
  }

  render() {
    return (
      <View>
        <Table
          {...this.props}
          loading={this.props.isLoading}
          columns={this.getColumns()}
          dataSource={this.state.dataMenus}
          pagination={{
            pageSize: 1000,
            hideOnSinglePage: true
          }}
        />
      </View>
    )
  }
}
