import faker from 'faker'

var landfillLists = [];

for(var i =0 ; i< 20; i++){
	landfillLists.push({
		_id: 1,
		name: faker.name.findName(),
		address: faker.address.streetAddress(),
		mapLocation: {
			lat: faker.streetAddress.latitude(),
			long: faker.streetAddress.longitude()
		},
		capacity : 1,
		arisesMass: 1,
		acreage: 1
	})
}
export default [
	{
		_id: 1,
		name: 'Bãi rác Đa Phước',
		address: '78 Trần Văn Kỷ',

	}
]