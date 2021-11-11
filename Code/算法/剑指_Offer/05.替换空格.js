const s = "We are happy.";

/**
 * @param {string} s
 * @return {string}
 */
 var replaceSpace = function(s) {
  let res = '';
  for (let i = 0; i < s.length; i+=1) {
    if (s[i].charCodeAt() === 32) {
      res += (String.fromCharCode(37) + String.fromCharCode(50) + String.fromCharCode(48));
    } else {
      res += s[i];
    }
  }
  return res;
};