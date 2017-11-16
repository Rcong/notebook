

var reverseString = function(s) {
    return s.split('').reverse().join('');
};

let str = '囡总 坤哥 小木 静云 我 国文';

document.write(`正序:${str}\n`);

document.write(`反序:${reverseString(str)}`);