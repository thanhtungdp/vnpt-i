const stationTypeUrl = '/station-type'
export default {
	login: '/login',
	measuring: {
		list: '/measuring',
		base: '/measuring',
		create: '/measuring/create',
		edit: '/measuring/edit/:key',
		editWithKey: '/measuring/edit'
	},
	stationType: {
		list: stationTypeUrl,
		base: stationTypeUrl,
		create: stationTypeUrl + '/create',
		edit: stationTypeUrl + '/edit/:key',
		editWithKey: stationTypeUrl + '/edit'
	},
	stationAuto: {
		list: '/station-auto',
		base: '/station-auto',
		create: '/station-auto/create',
		edit: '/station-auto/edit/:key',
		editWithKey: '/station-auto/edit'
	}
}
