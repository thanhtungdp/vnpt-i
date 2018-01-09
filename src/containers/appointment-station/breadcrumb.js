import slug from 'constants/slug'
import createBreadcrumb from 'shared/breadcrumb/hoc'
import Icon from 'themes/icon'

export default createBreadcrumb({
  list: {
    id: 'list',
    href: slug.staionAppointment.base,
    name: 'Danh sách điểm hẹn',
    icon: Icon.appointment
  },
  create: {
    id: 'create',
    href: slug.staionAppointment.create,
    name: 'Tạo mới'
  },
  edit: {
    href: slug.staionAppointment.edit,
    name: 'Chỉnh sửa'
  }
})
