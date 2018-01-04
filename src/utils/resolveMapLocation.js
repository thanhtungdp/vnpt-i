export async function resolveMapLocation(array) {
    let result = []
    if (array && array.length > 0 && array[0].mapLocation) {
        array = array.map(station => {
            station.mapLocation = {
                lat: station.mapLocation.lat,
                lng: station.mapLocation.long
            }
            return station
        })
        result = array
    }
    return result
}
