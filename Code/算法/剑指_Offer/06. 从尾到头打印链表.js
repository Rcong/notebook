/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * @param {ListNode} head
 * @return {number[]}
 */
var reversePrint = function (head) {
  const numbers = [];
  let node = head;
  while (node !== null) {
    numbers.push(node.val);
    node = node.next;
  }
  return numbers.reverse();
};
