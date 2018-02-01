var co = require('co');

function asyncFunction() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        let result = 'async result';
        resolve(result);
      }, 1000)
    })
  }
  
function asyncFunction2(data) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
        let result = 'async2 result，' + data;
        resolve(result);
        }, 1000)
    })
}

co(function *(){
  // yield any promise
  const data = yield asyncFunction();
  console.log(data)
  const data2 = yield asyncFunction2(data);
  console.log(data2)
}).catch(function onerror(err) {
    console.error(err.stack);
});

co(function *(){
  // resolve multiple promises in parallel
  var a = Promise.resolve(1);
  var b = Promise.resolve(2);
  var c = Promise.resolve(3);
  var res = yield [a, b, c];
  console.log(res);
  // => [1, 2, 3]
}).catch(function onerror(err) {
    console.error(err.stack);
});

// // errors can be try/catched
co(function *(){
  try {
    yield Promise.reject(new Error('boom'));
  } catch (err) {
    console.error(err.message); // "boom"
 }
}).catch(function onerror(err) {
    console.error(err.stack);
});

