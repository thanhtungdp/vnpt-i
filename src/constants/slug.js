export default {
  dashboard: '/dashboard',
  login: '/login',
  landFill: {
    base: '/landfill',
    list: '/landfill',
    create: '/landfill/create',
    edit: '/landfill/edit/:_id',
    editWithCode: '/landfill/edit/'
  },
  stationTransit: {
    base: '/transit-station',
    list: '/transit-station',
    create: '/transit-station/create',
    edit: '/transit-station/edit/:_id',
    editWithCode: '/transit-station/edit/'
  },
  appointment: {
    base: '/appointment',
    list: '/appointment',
    create: '/appointment/create'
  },
  category: {
    base: '/category',
    list: '/category',
    create: '/category/create',
    edit: '/category/edit/:code',
    editWithCode: '/category/edit/'
  },
  map: {
    base: '/map',
    car: '/map/car'
  },
  organization: {
    base: '/organization',
    list: '/organization',
    create: '/organization/create',
    edit: '/organization/edit/:_id',
    editWithId: '/organization/edit/'
  },
  car: {
    base: '/cars',
    list: '/cars',
    create: '/cars/create',
    edit: '/cars/edit/:code',
    editWithCode: '/cars/edit/'
  }
}
