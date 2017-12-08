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
