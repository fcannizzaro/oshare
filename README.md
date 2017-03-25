# oshare
Node Object Sharing (Socket) | **Remote Method Invocation** | Support for **callbacks**

![](https://github.com/fcannizzaro/oshare/blob/master/logo.png?raw=true)

# Install

```sh
npm i --save oshare
```

# Usage

## Server

#### server( port: int, shared: object \[, [callback](#callback)\] )

```javascript
var share = require('oshare');

var shared = {
  api: require('./api'),
  api2: require('./api')
}

share.server(3000, shared, (alert) => {
  alert('hello')
});
```

## Client

#### client( url: string, shared: object \[, [callback](#callback)\] )

```javascript
var share = require('oshare');

var shared = {
  alert: console.log
};

share.client('http://localhost:3000', shared, (api, api2) => {
  api.run(() => {
    console.log('Called after 3000 ms!');
  });
});
```

## Callback

- Arguments **should be ++keys++** of shared data of server/client.
- Order is **not** relevant.

```javascript

// if shared objec is
var shared = {
  module1 : require('../something'),
  max: 5,
  fn : () => console.log('hi!')
}

// callback will be
var callback = (module1, fn, max) => {
  fn();
  console.log(max);
}
```

## Supported Languages
- [x] Javascript
- [ ] Java
- [ ] Python
