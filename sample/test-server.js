var share = require('../index');

var shared = {
  api: require('./api'),
  api2: require('./api')
}

var io = share.server(3000, shared, (alert) => {
  alert('hello')
});

io.origins('*:*')
