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

module.exports = exports = {
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
    if (tree) {
      const result = [];
      const frontier = [tree]
      while (frontier.length > 0) {
        const node = frontier.shift();
        if (!node) {
          result.push('#');
        } else {
          result.push(node.key);
          if (node.left || node.right) {
            frontier.push(node.left)
            frontier.push(node.right)
          }
        }
      }
      return result;
    }
    return null;
  },

  getLevel: tree => {
    if (tree) {
      let level = 1
      const frontier = [tree]
      while (frontier.length > 0) {
        const node = frontier.shift()
        if (node.left || node.right) {
          level++
          if (node.left) frontier.push(node.left)
          if (node.right) frontier.push(node.right)
        }
      }
      return level
    }
    return 0
  },

  printTree: tree => {
    if (tree) {
      const totalLevel = exports.getLevel(tree)
      const totalLeafCount = Math.pow(2, totalLevel - 1)
      const totalWidthOfLeaf = 2 * totalLeafCount - 1

      let currentLevel = -1
      const frontier = [[tree, 0]]
      while (frontier.length > 0) {
        const [node, level] = frontier.shift();
        if (level > totalLevel - 1) {
          break
        }

        const levelIndent = Math.floor(totalWidthOfLeaf / Math.pow(2, level + 1))
        const levelLeafCount = Math.pow(2, level)
        let levelSpaceBetweenNode
        if (levelLeafCount > 1) {
          levelSpaceBetweenNode = Math.floor(((totalWidthOfLeaf - 2 * levelIndent) - levelLeafCount) / (levelLeafCount - 1))
        } else {
          levelSpaceBetweenNode = 0
        }

        if (level !== currentLevel) {
          process.stdout.write("\n");
          process.stdout.write(" ".repeat(levelIndent))
        }
        currentLevel = level

        process.stdout.write(`${node ? node.key : " "}${" ".repeat(levelSpaceBetweenNode)}`);

        if (level < totalLevel - 1) {
          frontier.push([node ? node.left : null, level + 1])
          frontier.push([node ? node.right : null, level + 1])
        }
      }
      process.stdout.write("\n");
    }
  }
}
