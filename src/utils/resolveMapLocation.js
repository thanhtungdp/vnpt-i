export async function resolveMapLocation(array) {
  let result = []
  if (array && array.length > 0 && array[0].mapLocation) {
    array = array.map(station => {
      station.mapLocation = {
        lat: parseFloat(station.mapLocation.lat),
        lng: parseFloat(station.mapLocation.long)
      }
      return station
    })
    result = array
  }
  return result
}

export function resolveMapLocationObject(object) {
  return {
    lat: parseFloat(object.mapLocation.lat),
    lng: parseFloat(object.mapLocation.long)
  }
}
