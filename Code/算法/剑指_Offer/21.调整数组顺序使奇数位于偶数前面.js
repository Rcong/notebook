const numbers = [1,2,3,4];

/**
 * @param {number[]} numbers
 * @return {number[]}
 */
const exchange = function(numbers) {
  if (!numbers.length) {
    return numbers
  }
  let oddNumbers = []; // 奇数数组
  let evenNumbers = []; // 偶数数组
  for (let index = 0; index < numbers.length; index++) {
    const num = numbers[index];
    if (numbers[index] % 2 !== 0) {
      oddNumbers.push(num);
    } else {
      evenNumbers.push(num);
    }
  }

  return oddNumbers.concat(evenNumbers);
};

const res = exchange(numbers);
console.info(res);