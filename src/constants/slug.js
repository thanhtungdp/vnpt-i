export default {
  dashboard: '/',
  login: '/login',
  controlStation: {
    base: '/control-station',
    trigger: '/control-station/:key/:name',
    triggerWithKey: '/control-station',
    config: '/control-station/config/:key/:name',
    configWithKey: '/control-station/config',
    history: '/control-station/history/:key/:name',
    historyWithKey: '/control-station/history'
  },
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
    editWithKey: '/station-auto/edit',
    config: '/station-auto/config/:key',
    configWithKey: '/station-auto/config',
    ftpInfo: '/station-auto/ftpInfo/:key',
    ftpInfoWithKey: '/station-auto/ftpInfo',
    ftpFile: '/station-auto/ftpFile/:key',
    ftpFileWithKey: '/station-auto/ftpFile'
  },
  onlineMonitoring: {
    base: '/online-monitoring'
  },
  monitoring: {
    base: '/monitoring',
    viewCamera: '/monitoring/camera/:key',
    viewCameraWithKey: '/monitoring/camera'
  },
  cameraControl: {
    base: '/cameraControl',
    detail: '/cameraControl/detail/:key/:name',
    detailWithKey: '/cameraControl/detail'
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
  password: {
    emailConfirm: '/password/email-confirm',
    codeConfirm: '/password/code-confirm/:key',
    codeConfirmWithKey: '/password/code-confirm',
    resetPassword: '/password/reset-password'
  },
  user: {
    list: '/user',
    base: '/user',
    create: '/user/create',
    edit: '/user/edit/:key',
    editWithKey: '/user/edit',
    changePassword: '/user/change-password',
    profile: '/user/profile',
    security: '/user/security',
    rule: '/user/rule/:key',
    ruleWithKey: '/user/rule',
    accountActive: '/account/activate/:key'
  },
  role: {
    list: '/role',
    base: '/role',
    create: '/role/create',
    edit: '/role/edit/:_id',
    editWithKey: '/role/edit'
  },
  camera: {
    base: '/camera',
    camera: '/camera/:key',
    cameraWithKey: '/camera'
  },
  subscription: {
    base: '/subscription'
  },
  support: {
    base: '/support',
    create: '/support/create'
  }
}
