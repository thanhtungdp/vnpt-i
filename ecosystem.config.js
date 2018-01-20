module.exports = {
	/**
	 * Application configuration section
	 * http://pm2.keymetrics.io/docs/usage/application-declaration/
	 */
	apps: [
		{
			name: 'tungtung_admin_frontend',
			script: './run_server.sh'
		}
	],

	/**
	 * Deployment section
	 * http://pm2.keymetrics.io/docs/usage/deployment/
	 */
	deploy: {
		production: {
			user: 'root', // user
			host: 'sv5.tungtung.co', // ip
			ref: 'origin/release', // branch được config để chạy production
			repo: 'git@gitlab.com:tungtung-dev/admin-manager/react-admin.git', // git
			path: '/data/pm2/tungtung-admin-frontend',
			'post-deploy': 'yarn install && yarn build && pm2 reload ecosystem.config.js --env production'
		}
	}
}
