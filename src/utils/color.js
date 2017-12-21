import { SHAPE } from 'themes/color'

export function getColorFromText(text, charCodeAt = 1) {
  var colors = [
    '#3498db',
    '#1abc9c',
    '#e67e22',
    '#e74c3c',
    '#34495e',
    '#8e44ad',
    '#2ecc71',
    '#d35400',
    '#f39c12',
    '#f1c40f'
  ]
  var number = 0
  if (text) {
    number = text.charCodeAt(charCodeAt)
  } else number = 2
  if (number > 10) {
    number = number % 10
  }
  if (number > 100) {
    number = number % 100
  }
  return colors[number]
}

export function getColorByNumber(number) {
  number = number % 10
  switch (number) {
    case 1:
      return SHAPE.RED
    case 2:
      return SHAPE.GREEN
    case 3:
      return SHAPE.ORANGE
    case 4:
      return SHAPE.YELLOW
    case 5:
      return SHAPE.PURPLE
    case 6:
      return SHAPE.BLACK
    case 7:
      return SHAPE.PRIMARY
    case 8:
      return SHAPE.PRIMARYBOLD
    case 9:
      return SHAPE.GRAYTEXT
    default:
      return SHAPE.PINK
  }
}
