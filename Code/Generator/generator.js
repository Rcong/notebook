var fs = require('fs');

var readFile = function (fileName){
    return new Promise(function (resolve, reject){
        fs.readFile(fileName, function(error, data){
            if (error) reject(error);
            resolve(data);
        });
    });
};

function * gen(){
    var f1 = yield readFile('/Users/raycloud/repo/Reading/練習/Generator/demo.txt');
    var f2 = yield readFile(f1.toString());
    console.info(f1.toString());
    console.info(f2.toString());
};

var g = gen();

g.next().value.then(function(data){
    g.next(data).value.then(function(data){
        g.next(data);
    });
})