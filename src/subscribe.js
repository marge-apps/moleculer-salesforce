const jsforce = require('jsforce');

module.exports = {
	name: 'salesforce',
	settings: {
		username: '',
		password: '',
		securityToken: ''
	},
	topics: [],
	created() {
		this.salesforceConnection = new jsforce.Connection();
	},
	async started() {
		const {salesforceConnection, schema, settings} = this;
		const {username, password, securityToken} = settings;

		await salesforceConnection.login(username, `${password}${securityToken}`);

		schema.topics.map(([topic, listener]) =>
			salesforceConnection.topic(topic).subscribe(listener)
		);
	},
	async stopped() {
		const {salesforceConnection} = this;

		await salesforceConnection.logout();
	}
};
