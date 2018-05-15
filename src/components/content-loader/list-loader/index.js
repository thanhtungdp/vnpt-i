import React from 'react'
import { autobind } from 'core-decorators'
import ContentLoader from 'react-content-loader'

@autobind
export default class QuizlistContentLoader extends React.PureComponent {
  render() {
    return (
      <div style={{ width: 600 }}>
        <ContentLoader
          height={90}
          width={600}
          speed={1}
          primaryColor="#eaeaea"
          secondaryColor="#f7f7f7"
        >
          <rect x="-2" y="3.1" rx="4" ry="4" width="577.61" height="12.85" />
          <rect x="1" y="34" rx="3" ry="3" width="103.7" height="14.21" />
          <rect x="127" y="34" rx="3" ry="3" width="103.7" height="14.21" />
          <rect x="261" y="89935" rx="3" ry="3" width="103.7" height="14.21" />
          <circle
            cx="10.845903006477066"
            cy="77.89590300647706"
            r="8.845903006477066"
          />
          <rect x="24" y="73.05" rx="0" ry="0" width="105" height="13.32" />
          <circle
            cx="180.84590300647707"
            cy="77.89590300647706"
            r="8.845903006477066"
          />
          <rect x="197" y="71.05" rx="0" ry="0" width="105" height="14.22" />
        </ContentLoader>
      </div>
    )
  }
}
