import React from 'react'
import ContentLoader from "react-content-loader"

const MyLoader = () => (
  <ContentLoader
    height={250}
    width={900}
    speed={2}
    primaryColor={"#f3f3f3"}
    secondaryColor={"#ecebeb"}
  >
    <rect x="21" y="12.47" rx="4" ry="4" width="186" height="24.18" />
    <rect x="414" y="-3" rx="5" ry="5" width="496" height="400" />
    <circle cx="348.816653826392" cy="25.406653826391967" r="10.816653826391969" />
    <circle cx="348.816653826392" cy="72.40665382639197" r="10.816653826391969" />
    <circle cx="347.816653826392" cy="118.40665382639197" r="10.816653826391969" />
    <circle cx="347.816653826392" cy="157.40665382639196" r="10.816653826391969" />
    <rect x="22" y="59.47" rx="4" ry="4" width="186" height="24.18" />
    <rect x="22" y="105.47" rx="4" ry="4" width="186" height="24.18" />
    <rect x="24" y="152.47" rx="4" ry="4" width="186" height="24.18" />
  </ContentLoader>
)

export default MyLoader
