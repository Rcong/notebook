/**
 * @param {number[]} nums
 * @return {number}
 */
var arrayPairSum = function(nums) {

    if(!isArray(nums)){throw('error')};

    return nums.sort((prev, next) => prev - next).filter((num, index) => index % 2 === 0 ).reduce((prev, next) => prev + next);

};

let isArray = (obj) => {
    return Object.prototype.toString.call(obj).slice(8, -1).toLowerCase() === 'array';
}