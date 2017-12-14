import React from 'react'
import { autobind } from 'core-decorators'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { Collapse } from 'reactstrap'
import IconRight from '@atlaskit/icon/glyph/chevron-right'
import IconDown from '@atlaskit/icon/glyph/chevron-down'

const NavigationItemCollapseWrapper = styled.div``

const FlexLabel = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 0px 8px 3px;
  transition: all 0.3s linear;
  background-color: ${props => (props.isActive ? `#eeeeee` : 'transparent')};
  &:hover {
    background-color: #eeeeee;
    border-radius: 2px;
    cursor: pointer;
  }
`
const SpanFlex = styled.span`
  display: flex;
  align-items: center;
`
const Label = styled.a`
  font-size: 12px;
  text-transform: uppercase;
  font-weight: 500;
`

@autobind
export default class NavigationItemCollapse extends React.PureComponent {
  static propTypes = {
    icon: PropTypes.any,
    label: PropTypes.any
  }

  state = {
    isOpen: false
  }

  toggleOpen() {
    this.setState({ isOpen: !this.state.isOpen })
  }

  render() {
    return (
      <NavigationItemCollapseWrapper>
        <FlexLabel isActive={this.state.isOpen} onClick={this.toggleOpen}>
          <Label>
            {this.props.icon ? (
              <SpanFlex>
                {this.props.icon}&nbsp;{this.props.label}
              </SpanFlex>
            ) : (
              this.props.label
            )}
          </Label>
          {this.state.isOpen ? <IconDown /> : <IconRight />}
        </FlexLabel>
        <Collapse isOpen={this.state.isOpen}>{this.props.children}</Collapse>
      </NavigationItemCollapseWrapper>
    )
  }
}
