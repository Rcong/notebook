/**
 * @param {number} num
 * @return {number}
 */
var findComplement = function(num) {
    
    if(typeof num !== 'number'){
        return 0;
    }

    let binaryNum = parseInt(num).toString(2);
    let complement = binaryNum.split('').map(char => char === '1' ? '0' : '1').join('');

    return parseInt(complement,2);

};