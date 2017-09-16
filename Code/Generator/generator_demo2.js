var fs = require('fs');

var readFile = function (fileName){
    return new Promise((resolve, reject) => {
        fs.readFile(fileName, function(error, data){
            if (error) reject(error);
            resolve(data);
        });
    });
};

function * gen(){
    var f1 = yield readFile('/Users/raycloud/repo/Reading/練習/Generator/demo.txt');

    var f2 = yield readFile(f1.toString());
    console.log(f1.toString());
    console.log(f2.toString());
};

function run(gen){
    var g = gen();
  
    let next = data => {
        var result = g.next(data);
        if (result.done) return result.value;
        result.value.then( data => {
            next(data);
        });
    }
  
    next();
  }
  
  run(gen);