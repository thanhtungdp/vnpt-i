/*eslint-disable*/
import React from 'react'
import PropTypes from 'prop-types'
import objectPath from 'object-path'
import { connectAutoDispatch } from 'redux/connect'
import { changeLanguage } from 'redux/actions/languageAction'
import { autobind } from 'core-decorators'
import ejs from 'ejs'

// eslint-disable-next-line
export const langPropTypes = PropTypes.shape({
  t: PropTypes.func,
  changeLanguage: PropTypes.func
})

export function translate(key, params = {}, isParse = true) {
  const languageData =
    typeof window !== 'undefined'
      ? window.currentLanguage
      : global.currentLanguage
  let translated = objectPath.get(languageData, key)
  if (translated && isParse) {
    return ejs.render(translated, params)
  } else return translated ? translated : ''
}

const createLanguageHoc = Component => {
  @connectAutoDispatch(
    state => ({
      languageData: state.language.data[state.language.locale],
      languageLocale: state.language.locale
    }),
    { changeLanguage }
  )
  @autobind
  class LanguageHoc extends React.PureComponent {
    static propTypes = {
      changeLanguage: PropTypes.func
    }

    static getInitialProps = Component.getInitialProps

    translate(key, params = {}, isParse = true) {
      let translated = objectPath.get(this.props.languageData, key)
      if (translated && isParse) {
        return ejs.render(translated, params)
      } else return translated ? translated : ''
    }

    changeLanguage(lang) {
      this.props.changeLanguage(lang)
    }

    render() {
      const langProps = {
        t: this.translate,
        locale: this.props.languageLocale,
        changeLanguage: this.changeLanguage
      }
      return <Component {...this.props} ref={this.props.ref} lang={langProps} />
    }
  }
  return LanguageHoc
}

export default createLanguageHoc
