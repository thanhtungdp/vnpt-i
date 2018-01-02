import React from 'react'
import { GOOGLE_MAP } from 'config'

export function getGoogleMapProps() {
  return {
    googleMapURL: `https://maps.googleapis.com/maps/api/js?key=${
      GOOGLE_MAP.KEY
    }&v=3.exp&libraries=geometry,drawing,places`,
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: `100vh` }} />,
    mapElement: <div style={{ height: `100%` }} />
  }
}
