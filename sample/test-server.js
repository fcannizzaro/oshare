const share = require('../index');

const shared = {
	api: require('./api'),
	api2: require('./api'),
	obj: {
		node: "7.5.3",
		number: 150,
		flag: true
	}
}

const authorization = "$auth-key";

const callback = (alert, alert2) => {
	alert('hello!!')
};

const io = share.server(3000, { shared, authorization }, callback);

io.origins('*:*')
