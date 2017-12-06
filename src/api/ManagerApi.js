export function getLandfill() {
	return new Promise((resolve) => {
		resolve([
			{
				_id: 1,
				name: 'Tung',
				code: '123456',
				description: 'Good'
			},
			{
				_id: 1,
				name: 'Tung',
				code: '1234567',
				description: 'Good'
			},
			{
				_id: 1,
				name: 'Tung',
				code: '1234568',
				description: 'Good'
			},
			{
				_id: 1,
				name: 'Tung2',
				code: '123456',
				description: 'Good'
			}
		])
	})
}