const { buildTree, printTree } = require("../treelab")

printTree(buildTree("1,2,3,#,#,4,#,#,5".split(",")))