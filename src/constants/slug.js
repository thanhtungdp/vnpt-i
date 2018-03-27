export default {
  dashboard: '/',
  login: '/login',
  measuring: {
    list: '/measuring',
    base: '/measuring',
    create: '/measuring/create',
    edit: '/measuring/edit/:key',
    editWithKey: '/measuring/edit'
  },
  stationType: {
    list: '/station-type',
    base: '/station-type',
    create: '/station-type/create',
    edit: '/station-type/edit/:key',
    editWithKey: '/station-type/edit'
  },
  stationAuto: {
    list: '/station-auto',
    base: '/station-auto',
    create: '/station-auto/create',
    edit: '/station-auto/edit/:key',
    editWithKey: '/station-auto/edit'
  },
  onlineMonitoring: {
    base: '/online-monitoring'
  },
  monitoring: {
    base: '/monitoring'
  },
  map: {
    base: '/map'
  },
  dataSearch: {
    base: '/data-search'
  },
  avgSearch: {
    base: '/avg-search'
  },
  user: {
    list: '/user',
    base: '/user',
    create: '/user/create',
    edit: '/user/edit/:key',
    editWithKey: '/user/edit',
    changePassword: '/user/change-password',
    profile: '/user/profile',
    emailConfirm: '/user/email-confirm',
    codeConfirm: '/user/code-confirm/:key',
    codeConfirmWithKey: '/user/code-confirm',
    resetPassword: '/user/reset-password'
  },
  role: {
    list: '/role',
    base: '/role',
    create: '/role/create',
    edit: '/role/edit/:key',
    editWithKey: '/role/edit'
  }
}
