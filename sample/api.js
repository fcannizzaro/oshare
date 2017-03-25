var run = (cb) => {
  console.log("wait 3000 ms and run callback");
  setTimeout(cb, 3000);
};

var submodule = {
  hello: (name, age) => {
    console.log('Hello %s ! Your age is %d', name, age);
  }
};

module.exports.valore = 5;
module.exports.run = run;
module.exports.submodule = submodule;
