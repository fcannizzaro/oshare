var share = require('../index');

var shared = {
  alert: console.log
};

share.client('http://localhost:3000', shared, (api, api2) => {
  api.run((value, number) => {
    console.log(`${value} after ${number} ms!`);
  });
});
