import faker from 'faker'
import uuid from 'uuid'

export default function createData(length = 10) {
  var landfillLists = []
  for (var i = 0; i < 10; i++) {
    landfillLists.push({
      _id: uuid.v4(),
      name: faker.name.findName(),
      address: faker.address.streetAddress(),
      mapLocation: {
        lat: faker.address.latitude(),
        long: faker.address.longitude()
      },
      capacity: 1,
      arisesMass: 1,
      acreage: 1,
      district: faker.address.country()
    })
  }
  return landfillLists
}
export const burialStationList = [
  {
    id: 1,
    name: 'Tây Bắc Củ Chi',
    mapLocation: { lat: 10.794259, lng: 106.763286 },
    district: 'Quận Củ Chi'
  },
  {
    id: 2,
    name: 'Đa Phước',
    mapLocation: { lat: 10.723955, lng: 106.717533 },
    district: 'Quận Củ Chi'
  }
]
