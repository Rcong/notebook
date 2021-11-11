const matrix = [
  [1,2,3,4,5],
  [6,7,8,9,10],
  [11,12,13,14,15],
  [16,17,18,19,20],
  [21,22,23,24,25],
  // [1,2,3,4],
  // [5,6,7,8],
  // [9,10,11,12]
];

/**
 * @param {number[][]} matrix
 * @return {number[]}
 */
 var spiralOrder = function(matrix) {
  if (!matrix.length || !matrix[0].length) {
    return [];
  }
  const array = [];
  let top = 0;
  let left = 0;
  let bottom = matrix.length - 1;
  let right = matrix[0].length - 1;

  while (left <= right && top <= bottom) {
    for (let index = left; index <= right; index += 1) {
      array.push(matrix[top][index]);
    }
    top += 1;
    if (top > bottom) { break; }
    for (let index = top; index <= bottom; index += 1) {
      array.push(matrix[index][right]);
    }
    right -= 1;
    if (right < left) { break; }
    for (let index = right; index >= left; index -= 1) {
      array.push(matrix[bottom][index]);
    }
    bottom -= 1;
    if (bottom < top) { break; }
    for (let index = bottom; index >= top; index -= 1) {
      array.push(matrix[index][left]);
    }
    left += 1;
    if (left > right) { break; }
  }

  return array;
};

const array = spiralOrder(matrix);
console.info(array);