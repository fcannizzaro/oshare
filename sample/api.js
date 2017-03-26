var run = (cb) => {
  console.log("wait 3000 ms and run callback");
  var delay = 2000;
  setTimeout(() => {
    cb('Response!', delay);
  }, delay);
};

var submodule = {
  hello: (name, age) => {
    console.log('Hello %s ! Your age is %d', name, age);
  }
};

module.exports.value = 5;
module.exports.run = run;
module.exports.submodule = submodule;
