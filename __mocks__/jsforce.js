const login = jest.fn();
const logout = jest.fn();
const search = jest.fn();
const query = jest.fn();

function Connection() {
	return {
		login,
		logout,
		search,
		query
	};
}

module.exports = {Connection};
