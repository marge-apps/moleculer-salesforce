const jsforce = require('jsforce');

module.exports = {
	name: 'salesforce',
	settings: {
		username: '',
		password: '',
		securityToken: ''
	},
	actions: {
		query: {
			params: {
				query: {type: 'string'}
			},
			handler(ctx) {
				const {salesforceConnection} = this;
				const {query} = ctx.params;

				return salesforceConnection.query(query);
			}
		},
		search: {
			params: {
				query: {type: 'string'}
			},
			handler(ctx) {
				const {salesforceConnection} = this;
				const {query} = ctx.params;

				return salesforceConnection.search(query);
			}
		}
	},
	created() {
		this.salesforceConnection = new jsforce.Connection();
	},
	async started() {
		const {salesforceConnection, settings} = this;
		const {username, password, securityToken} = settings;

		await salesforceConnection.login(username, `${password}${securityToken}`);
	},
	async stopped() {
		const {salesforceConnection} = this;

		await salesforceConnection.logout();
	}
};
