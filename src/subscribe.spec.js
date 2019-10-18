const {ServiceBroker} = require('moleculer');
const subscribeService = require('./subscribe');

jest.mock('jsforce');

describe('Subscribe service', () => {
	const broker = new ServiceBroker();
	const service = broker.createService(subscribeService);

	beforeAll(() => broker.start());
	afterAll(() => broker.stop());

	it('should be created', () => {
		expect(service).toBeDefined();
	});
});
