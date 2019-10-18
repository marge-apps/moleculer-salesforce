const jsforce = require('jsforce');
const {ServiceBroker} = require('moleculer');
const salesforceService = require('./api');

jest.mock('jsforce');

const connection = new jsforce.Connection();

describe('Salesforce service', () => {
	const broker = new ServiceBroker();
	const service = broker.createService(salesforceService);

	beforeAll(() => broker.start());
	afterAll(() => broker.stop());

	it('should be created', () => {
		expect(service).toBeDefined();
	});

	it('should call query', async () => {
		const query = 'SELECT lorem FROM ipsum;';

		await broker.call('salesforce.query', {
			query
		});

		expect(connection.query).toHaveBeenCalledWith(query);
	});

	it('should call search', async () => {
		const query = 'SELECT lorem FROM ipsum;';

		await broker.call('salesforce.search', {
			query
		});

		expect(connection.search).toHaveBeenCalledWith(query);
	});
});
