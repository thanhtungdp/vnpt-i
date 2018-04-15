import React from 'react'
import AkDropdownMenu, {
  DropdownItemGroup,
  DropdownItem
} from '@atlaskit/dropdown-menu'
import { AkGlobalItem } from '@atlaskit/navigation'
import styled from 'styled-components'
import FlagIcon from 'react-flag-kit/lib/CDNFlagIcon.js'
import { autobind } from 'core-decorators'
import createLang from 'hoc/create-lang'

const languages = [
  {
    flag: 'US',
    locale: 'en',
    name: 'English'
  },
  {
    flag: 'VN',
    locale: 'vi',
    name: 'Vietnamese'
  }
]

const FlagWrapper = styled.div`
  width: 30px;
  height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
`

const DropdownItemWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: safe;
`
const LabelWrapper = styled.div`
  padding-left: 8px;
`

@createLang
@autobind
export default class ChangeLanguage extends React.Component {
  selectLanguage(e, item) {
    if (e) e.preventDefault()
    this.props.lang.changeLanguage(item.locale)
    window.location = window.location.pathname
  }

  getFlag() {
    const language = languages.find(
      lang => lang.locale === this.props.lang.locale
    )
    if (!language) return
    return language.flag
  }

  render() {
    return (
      <AkDropdownMenu
        appearance="tall"
        position="right bottom"
        trigger={
          <AkGlobalItem>
            <FlagWrapper>
              <FlagIcon code={this.getFlag()} size={25} />
            </FlagWrapper>
          </AkGlobalItem>
        }
      >
        <DropdownItemGroup title={`change language`}>
          {languages.map((item, index) => {
            return (
              <DropdownItem
                key={index}
                onClick={e => this.selectLanguage(e, item)}
              >
                <DropdownItemWrapper>
                  <FlagIcon code={item.flag} size={25} />
                  <LabelWrapper>
                    <span>{item.name}</span>{' '}
                  </LabelWrapper>
                </DropdownItemWrapper>
              </DropdownItem>
            )
          })}
        </DropdownItemGroup>
      </AkDropdownMenu>
    )
  }
}
