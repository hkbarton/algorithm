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
function parseTreeValue(value) {
  return !value || value === "#" ? null : value
}

module.exports = {
  buildTree: treeData => {
    if (treeData instanceof Array && treeData.length > 0) {
      if (!treeData[0] || treeData[0] === "#") {
        throw new Error("root node must not empty")
      }
      const result = {
        key: parseTreeValue(treeData.shift())
      }
      const nodeToBeProcess = [];
      nodeToBeProcess.push(result);
      while (treeData.length > 0 && nodeToBeProcess.length > 0) {
        const item = nodeToBeProcess.shift();
        const leftValue = parseTreeValue(treeData.shift())
        const rightValue = parseTreeValue(treeData.shift())
        if (leftValue) {
          item.left = { key: leftValue }
          nodeToBeProcess.push(item.left)
        }
        if (rightValue) {
          item.right = { key: rightValue }
          nodeToBeProcess.push(item.right)
        }
      }
      return result;
    }
    return null
  },

  treeToArray: tree => {
    if (tree instanceof Object) {
      var result = [];
      var queue = [tree];
      var item;
      while (queue.length > 0) {
        item = queue.shift();
        if (item === null) {
          result.push('#');
        } else {
          result.push(String(item.key));
          if (item.left || item.right) { // not leaf node
            queue.push(item.left);
            queue.push(item.right);
          }
        }
      }
      return result;
    }
    return null;
  },

  printTree: tree => {
    // print tree use breadth-first tranversal
    if (tree) {
      var temp = [];
      temp.push({ data: tree, level: 0 });
      var node = null;
      var level = 0;
      while (temp.length > 0) {
        node = temp.shift();
        if (node.level != level) {
          process.stdout.write("\n");
          level = node.level;
        }
        process.stdout.write(node.data.key + "  ");
        if (node.data.left) {
          temp.push({ data: node.data.left, level: (node.level + 1) });
        }
        if (node.data.right) {
          temp.push({ data: node.data.right, level: (node.level + 1) });
        }
      }
      process.stdout.write("\n");
    }
  }
}
