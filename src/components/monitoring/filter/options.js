import monitoringFilter from 'constants/monitoringFilter'

export const GROUP_OPTIONS = [
  {
    value: monitoringFilter.GROUP.GROUP,
    name: monitoringFilter.GROUP.GROUP_LABEL
  },
  {
    value: monitoringFilter.GROUP.UNGROUP,
    name: monitoringFilter.GROUP.UNGROUP_LABEL
  }
]

export const ORDER_OPTIONS = [
  {
    value: monitoringFilter.ORDER.NAME,
    name: monitoringFilter.ORDER.LABEL_NAME
  },
  {
    value: monitoringFilter.ORDER.NUMBER,
    name: monitoringFilter.ORDER.LABEL_NUMBER
  }
]
