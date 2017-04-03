![](https://github.com/fcannizzaro/oshare/blob/master/logo.png?raw=true)

Node Object Sharing (Socket) | **Remote Method Invocation** | Support for **callbacks**

[![npm](https://img.shields.io/npm/v/oshare.svg)](https://www.npmjs.com/package/oshare)

# Install

```sh
npm i --save oshare
```

# Usage

## Server

#### server( port: int, shared: object \[, [callback](#callback), [language](#supported-languages)\] )

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

api.js
```javascript
exports.run = (cb) => {
  console.log("wait 3000 ms and run callback");
  setTimeout(cb, 3000);
};
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

## Browser

```html
<script src="oshare-browser.js"></script>
```

```html
<script>

  var shared = {
    alert: console.log
  };

  oshare('http://localhost:3000', shared, (api, api2) => {
    api.run(() => {
      console.log('Called after 3000 ms!');
    });
  });

</script>
```

## Callback

- Arguments **should be key** of shared data of server/client.
- Order is **not** relevant.

```javascript

// if shared object is

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

Use **"language"** argument to generate "Remote" class for a client.

- [x] javascript 
- [x] java [oshare-java](https://github.com/fcannizzaro/oshare-java), [oshare-android](https://github.com/fcannizzaro/oshare-android)
- [ ] python
