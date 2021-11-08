const matrix = [
  [1, 4, 7, 11, 15],
  [2, 5, 8, 12, 19],
  [3, 6, 9, 16, 22],
  [10, 13, 14, 17, 24],
  [18, 21, 23, 26, 30],
];
const findNumberIn2DArray = function (matrix, target) {
  if (!matrix.length) {
    return false
  }
  let length = matrix[0].length;
  let size = matrix.length;
  let i = size - 1;
  let j = 0;
  while (i >= 0 && i < size && j >= 0 && j < length) {
    if (matrix[i][j] === target) {
      return true;
    }
    if (matrix[i][j] < target) {
      j++;
    }
    if (matrix[i][j] > target) {
      i--;
    }
  }
  return false
};
console.info(findNumberIn2DArray(matrix, 5));
console.info(findNumberIn2DArray(matrix, 20));
console.info(findNumberIn2DArray(matrix, 30));
console.info(findNumberIn2DArray(matrix, 31));