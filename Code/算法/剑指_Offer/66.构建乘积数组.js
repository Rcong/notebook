const numbers = [1, 2, 3, 4, 5];

/**
 * @param {number[]} numbers
 * @return {number[]}
 */
// 暴力解法双循环
var constructArr = function (numbers) {
  const res = [];
  for (let i = 0; i < numbers.length; i += 1) {
    let result = 1;
    for (let j = 0; j < numbers.length; j += 1) {
      if (j !== i) {
        result *= numbers[j];
      }
    }
    res.push(result);
  }
  return res;
};

// 左右各遍for循环历一次计算相乘结果，然后相乘。
var constructArr = function (numbers) {
  const left = [];
  for (let i = 0; i < numbers.length; i += 1) {
    left[i] = i === 0 ? 1 : left[i - 1] * numbers[i - 1];
  }
  const right = [];
  for (let i = numbers.length - 1; i >= 0; i -= 1) {
    right[i] = i === numbers.length - 1 ? 1 : right[i + 1] * numbers[i + 1];
  }
  for (let i = 0; i < left.length; i += 1) {
    left[i] *= right[i];
  }
  return left;
};

const res = constructArr(numbers);
console.info(res);
