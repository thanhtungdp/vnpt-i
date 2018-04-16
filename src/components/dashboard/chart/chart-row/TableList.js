import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import stationStatus from 'constants/stationStatus'

const Status = styled.div`
  width: 8px;
  height: 8px;
  background-color: #1dce6c;
  border-radius: 4px;
`

const Row = styled.div`
  display: flex;
  padding: 8px 0px;
  transition: all 0.2s linear;
  ${props =>
    props.isActive
      ? `
      background-color: #EFF0F0;
      > div {
        color: #0052CC;
      }
      `
      : ''} border-bottom: 1px solid rgba(241, 241, 241, .9);
  &:hover {
    background-color: rgba(241, 241, 241, 0.7);
    cursor: pointer;
  }
`

const Column = styled.div`
  ${props => (props.isTh ? 'font-weight: 600;' : '')};
`

const IndexColumn = Column.extend`
  width: 30px;
  text-align: center;
  font-weight: 600;
`

const NameColumn = Column.extend`
  flex: 1;
  padding-left: 8px;
`

const StatusColumn = Column.extend`
  width: 55px;
  display: flex;
  justify-content: center;
  align-items: center;
`

export default class TableListCustom extends React.PureComponent {
  static propTypes = {
    data: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string,
        key: PropTypes.string
      })
    ),
    currentItem: PropTypes.shape({
      name: PropTypes.string,
      key: PropTypes.string
    }),
    onChangeItem: PropTypes.func
  }

  state={
    stationStatus: stationStatus.GOOD
  }

  async componentWillMount() {
    console.log('componentWillMount')
    console.log(this.props.data)
    console.log(this.props.currentItem)
  }

  render() {
    return (
      <div>
        <Row>
          <IndexColumn isTh>#</IndexColumn>
          <NameColumn isTh>Name</NameColumn>
          <StatusColumn isTh>Status</StatusColumn>
        </Row>
        {this.props.data.map((item, index) => (
          <Row
            onClick={e => this.props.onChangeItem(e, item)}
            key={item.key}
            isActive={this.props.currentItem.key === item.key}
          >
            <IndexColumn>{index + 1}</IndexColumn>
            <NameColumn className="name">{item.name}</NameColumn>
            <StatusColumn>
              {' '}
              <Status />
            </StatusColumn>
          </Row>
        ))}
      </div>
    )
  }
}
