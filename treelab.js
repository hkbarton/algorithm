// tree data is an array like this:
// {1,2,3,#,#,4,#,#,5}, represent the tree:
/*
     1
   /   \
  2     3
      /
    4
      \
       5
*/
exports.buildTree = function(treeData){
  if (treeData instanceof Array && treeData.length > 0){
    var result = {};
    result.key = parseInt(treeData.shift());
    var handle = [];
    handle.push(result);
    var parseTreeKey = function(value){
      if (value=='#'){
        return null;
      }else{
        return parseInt(value);
      }
    };
    while(treeData.length > 0 && handle.length > 0){
      var item = handle.shift();
      var leftKey = parseTreeKey(treeData.shift());
      var rightKey = parseTreeKey(treeData.shift());
      item.left = leftKey ? {key:leftKey} : null;
      item.right = rightKey ? {key:rightKey} : null;
      if (item.left){
        handle.push(item.left); 
      }
      if (item.right){
        handle.push(item.right);
      }
    }
    return result;
  }
  return null;
};

exports.treeToArray = function(tree){
  if (tree instanceof Object){
    var result = [];
    var queue = [tree];
    var item;
    while(queue.length > 0){
      item = queue.shift();
      if (item===null){
        result.push('#');
      }else{
        result.push(String(item.key));
        if (item.left || item.right){ // not leaf node
          queue.push(item.left);
          queue.push(item.right);
        }
      }
    }
    return result;
  }
  return null;
};

exports.printTree = function(tree){
  // print tree use breadth-first tranversal
  if (tree){
    var temp = [];
    temp.push({data:tree, level:0});
    var node = null;
    var level = 0;
    while(temp.length>0){
      node = temp.shift();
      if (node.level!=level){
        process.stdout.write("\n");
        level = node.level;
      }
      process.stdout.write(node.data.key + "  ");
      if (node.data.left){
        temp.push({data:node.data.left, level:(node.level + 1)});
      }
      if (node.data.right){
        temp.push({data:node.data.right, level:(node.level + 1)});
      }
    }
    process.stdout.write("\n");
  }
};
