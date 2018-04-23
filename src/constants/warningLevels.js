export const warningLevels = {
  GOOD: 'GOOD',
  EXCEEDED_TENDENCY: 'EXCEEDED_TENDENCY',
  EXCEEDED_PREPARING: 'EXCEEDED_PREPARING',
  EXCEEDED: 'EXCEEDED',
  DEFAULT: 'GOOD'
}

export const colorLevels = {
  GOOD: '#1dce6c',
  EXCEEDED_TENDENCY: '#FFF954',
  EXCEEDED_PREPARING: '#F08432',
  EXCEEDED: '#EA3223'
}

export const warningLevelsNumber = {
  GOOD: 1,
  EXCEEDED_TENDENCY: 2,
  EXCEEDED_PREPARING: 3,
  EXCEEDED: 4
}
export default { warningLevels, colorLevels, warningLevelsNumber }
