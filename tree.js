var TreeNode = function(value, leftChild, rightChild){
  this.value = value;
  this.left = leftChild;
  this.right = rightChild;
};

function createTestTree(){
  var root = new TreeNode(2);
  var l1left = new TreeNode(5);
  var l1right = new TreeNode(19);
  root.left = l1left;
  root.right = l1right;
  var l2left1 = new TreeNode(4);
  var l2right1 = new TreeNode(3);
  l1left.left = l2left1;
  l1left.right = l2right1;
  var l2left2 = new TreeNode(8);
  var l2right2 = new TreeNode(7);
  l1right.left = l2left2;
  l1right.right = l2right2;
  l2left1.left = new TreeNode(23);
  l2left1.right = new TreeNode(12);
  return root;
}

function convertTreeToBreadthArray(tree){
  if (tree){
    var result = [];
    var temp = [];
    temp.push(tree);
    while(temp.length>0){
      var e = temp.shift();
      result.push(e.value);
      if (e.left){
        temp.push(e.left);
      }
      if (e.right){ 
        temp.push(e.right);
      }
    }
    return result;
  }
  return null;
}

function convertTreeToDeepthArray(tree, result){
  if (tree){
    result.push(tree.value);
    convertTreeToDeepthArray(tree.left, result);
    convertTreeToDeepthArray(tree.right, result);
  }
}

var _treearray = convertTreeToBreadthArray(createTestTree());
console.log(_treearray);

var _unusearray = [];
convertTreeToDeepthArray(createTestTree(), _unusearray);
console.log(_unusearray);
