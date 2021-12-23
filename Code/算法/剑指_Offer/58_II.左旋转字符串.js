const s = "abcdefg";
const k = 2;

/**
 * @param {string} s
 * @param {number} n
 * @return {string}
 */
var reverseLeftWords = function (s, n) {
  let rightStr = "";
  let leftStr = "";
  for (let i = 0; i < s.length; i += 1) {
    if (i <= n - 1) {
      rightStr += s[i];
    } else {
      leftStr += s[i];
    }
  }
  return leftStr + rightStr;
};

const res = reverseLeftWords(s, k);
console.info(res);