import withSize from 'react-sizes'

export default withSize(({ height }) => ({ windowHeight: height - 16 }))
