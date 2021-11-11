const nums = [7,5,6,4];

/**
 * @param {number[]} nums
 * @return {number}
 */
 var reversePairs = function(nums) {

};

// 暴力解法
// var reversePairs = function(nums) {
//   if (!nums.length) {
//     return 0
//   }
//   let count = 0;
//   for (let i = 0; i < nums.length; i++) {
//     for (let j = i + 1; j < nums.length; j++) {
//       if (nums[i] > nums[j]) {
//         count++;
//       }
//     }
//   }
//   return count;
// };

const res = reversePairs(nums);
console.info(res);