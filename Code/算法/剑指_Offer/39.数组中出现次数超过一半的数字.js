const nums = [1, 2, 3, 2, 2, 2, 5, 4, 2];

/**
 * @param {number[]} nums
 * @return {number}
 */
 var majorityElement = function(nums) {
  if (!nums.length) {
    return 0;
  }
  const half = Math.ceil(nums.length / 2);
  const hashMap = {};
  for (let index = 0; index < nums.length; index++) {
    const num = nums[index];
    if (hashMap[num]) {
      hashMap[num] += 1;
    } else {
      hashMap[num] = 1;
    }
  }
  for (const num in hashMap) {
    if (parseInt(hashMap[num]) >= half) {
      return num;
    }
  }
  return 0;
};

const res = majorityElement(nums);
console.info(res);