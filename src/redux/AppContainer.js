import React from 'react'
import { connect } from 'react-redux'

@connect(state => ({
  languageData: state.language.data[state.language.locale],
  languageLocale: state.language.locale
}))
export default class AppContainer extends React.Component {
  componentWillMount() {
    window.currentLanguage = this.props.languageData
  }

  render() {
    return this.props.children
  }
}
