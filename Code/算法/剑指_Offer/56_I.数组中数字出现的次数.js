const nums = [4,1,4,6];
const nums2 = [1,2,10,4,1,4,3,3];

/**
 * @param {number[]} nums
 * @return {number[]}
 */
 var singleNumbers = function(nums) {
    if (!nums.length) {
      return [];
    }
    const map = new Map();
    for (let i = 0; i < nums.length; i++) {
      const num = nums[i];
      if (map.get(num)) {
        map.delete(num)
      } else {
        map.set(num, true);
      }
    }

    const res = [];
    for (var [key] of map) {
      res.push(key);
    }

    return res;
};

const res = singleNumbers(nums);
console.info(res);
const res2 = singleNumbers(nums2);
console.info(res2);