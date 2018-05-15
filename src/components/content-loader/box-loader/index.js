import React from 'react'
import ContentLoader from 'react-content-loader'

// 2. Then copy your loader
export default props => (
  <div style={{ width: 280 }}>
    <ContentLoader
      height={75}
      width={280}
      speed={2}
      primaryColor="#eaeaea"
      secondaryColor="#f7f7f7"
      {...props}
    />
  </div>
)
