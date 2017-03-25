var share = require('../index');

var shared = {
  alert: console.log
};

share.client('http://localhost:3000', shared, (api, api2) => {
  api.run(() => {
    console.log('Called after 3000 ms!');
  });
});
