const share = require('../index');

const shared = {
	alert: console.log
};

const authorization = "$auth-key";

share.client('http://localhost:3000', { shared, authorization }, (api, api2) => {
	api.run((value, number) => {
		console.log(`${value} after ${number} ms!`);
	});
});
