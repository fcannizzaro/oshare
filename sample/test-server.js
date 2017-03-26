var share = require('../index');

var shared = {
  api: require('./api'),
  api2: require('./api'),
  obj: {
    node: "7.5.3",
    number: 150,
    flag: true
  }
}

var callback = (alert, alert2) => {
  alert('hello!!')
};

var io = share.server(3000, shared, callback);

io.origins('*:*')
