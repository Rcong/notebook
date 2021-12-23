const s = "abaccdeff";

/**
 * @param {string} s
 * @return {character}
 */
var firstUniqChar = function (s) {
  const m = new Map();
  for (let i = 0; i < s.length; i += 1) {
    const count = m.get(s[i]);
    if (count) {
      m.set(s[i], count + 1);
    } else {
      m.set(s[i], 1);
    }
  }
  let res = " ";
  for (const [key, value] of m) {
    if (value === 1) {
      res = key;
      break;
    }
  }
  return res;
};
