import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { autobind } from 'core-decorators'
import { AkCreateDrawer, AkNavigationItemGroup } from '@atlaskit/navigation'
import ArrowLeftIcon from '@atlaskit/icon/glyph/arrow-left'
import styled from 'styled-components'
import { SHAPE } from 'themes/color'
import swal from 'sweetalert2'

const ImageIcon = styled.img`
  width: 30px;
  height: auto;
  margin-right: 8px;
`

const LinkStyle = styled.a`
  display: block;
  padding: 8px 16px;
  background-color: #ffffff;
  transition: all 0.3s linear;
  border-radius: 2px;
  &:hover {
    background-color: ${SHAPE.GRAYMORELIGHT};
    color: ${SHAPE.PRIMARY};
  }
`
@autobind
class AppLink extends React.PureComponent {
  static propTypes = {
    icon: PropTypes.string,
    name: PropTypes.string,
    href: PropTypes.string
  }

  handleClickLink(e) {
    if (!this.props.href) e.preventDefault()
    swal({
      type: 'info',
      title: 'App ' + this.props.children + ' is building',
      text: 'We will send newsletter when we complete'
    })
  }

  render() {
    return (
      <LinkStyle onClick={this.handleClickLink} href={this.props.href}>
        <ImageIcon src={`/images/logo/icon/${this.props.icon}.png`} />{' '}
        {this.props.children}
      </LinkStyle>
    )
  }
}

export default class DocumentDrawer extends PureComponent {
  render() {
    return (
      <AkCreateDrawer
        heading={null}
        key="drawler"
        backIcon={<ArrowLeftIcon label="" />}
        {...this.props}
      >
        <div key="drawler" style={{ marginTop: -64 }}>
          <AkNavigationItemGroup title="Other apps">
            <AppLink href="http://app.ilotusland.vn" icon="enviroment">
              for Enviroment
            </AppLink>
            <AppLink icon="water">for Water</AppLink>
            <AppLink icon="electronic">for Electronic</AppLink>
            <AppLink icon="traffic">for Traffic</AppLink>
          </AkNavigationItemGroup>
        </div>
      </AkCreateDrawer>
    )
  }
}
