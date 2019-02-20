/**
 * @param {TreeNode} t1
 * @param {TreeNode} t2
 * @return {TreeNode}
 */
var mergeTrees = function(t1, t2) {
    
    if(t1 && t2){
        var t = new TreeNode();
        t.val = t1.val + t2.val;
        t.left = mergeTrees(t1.left, t2.left);
        t.right = mergeTrees(t1.right, t2.right);
        return t;
    }
    
    return t1 || t2;

};

function TreeNode(val) {
    this.val = val;
    this.left = this.right = null;
}