import React from 'react'

export function cleanProps (cleanKeyProps, props) {
  let newProps = { ...props }
  cleanKeyProps.map(key => {
    delete newProps[key]
    return {}
  })
  return newProps
}

export function createComponentDisableProps (Component, propsDisable = []) {
  return ({ children, ...props }) =>
    <Component {...cleanProps(propsDisable, props)}>
      {children}
    </Component>
}
