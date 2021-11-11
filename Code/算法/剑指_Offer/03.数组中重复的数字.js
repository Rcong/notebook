const nums = [2, 3, 1, 0, 2, 5, 3];

/**
 * @param {number[]} nums
 * @return {number}
 */
var findRepeatNumber = function (nums) {
  const map = {};
  for (let i = 0; i < nums.length; i++) {
    const num = nums[i];
    if (map[num]) {
      return num;
    }
    map[num] = 1;
  }
};

// 原地交换
var findRepeatNumber2 = function (nums) {
  let i = 0;
  while (i < nums.length) {
    if (nums[i] == i) {
      i++;
      continue;
    }
    if (nums[nums[i]] == nums[i]) {
      return nums[i];
    }
    const tmp = nums[i];
    nums[i] = nums[tmp];
    nums[tmp] = tmp;
  }
  return -1;
};