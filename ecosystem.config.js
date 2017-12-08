module.exports = {
	/**
	 * Application configuration section
	 * http://pm2.keymetrics.io/docs/usage/application-declaration/
	 */
	apps: [
		{
			name: 'scm_cms_frontend',
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
			host: '125.212.251.174', // ip
			ref: 'origin/release', // branch được config để chạy production
			repo: 'git@gitlab.com:vietan-chatthairan/swm-cms-frontend.git', // git
			path: '/data/swm/swm-cms-frontend',
			'post-deploy': 'yarn install && yarn build && pm2 reload ecosystem.config.js --env production'
		}
	}
}
