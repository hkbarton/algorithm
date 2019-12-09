const { buildTree, printTree } = require("../base-ds/tree")
const { readInput } = require("../utils/stdio")

function printLeftEdge(tree) {
  let currentLayer = -1
  const frontier = [[tree, 0]]
  while (frontier.length > 0) {
    const [next, layer] = frontier.shift()
    if (layer !== currentLayer) {
      process.stdout.write(`${next.key},`)
    }
    currentLayer = layer
    if (next.left) {
      frontier.push([next.left, layer + 1])
    }
    if (next.right) {
      frontier.push([next.right, layer + 1])
    }
  }
  process.stdout.write("\n")
}

function printRightEdge(tree) {
  let previousNode
  let previousLayer = -1
  const frontier = [[tree, 0]]
  while (frontier.length > 0) {
    const [next, layer] = frontier.shift()
    if (previousLayer != layer && previousNode) {
      process.stdout.write(`${previousNode.key},`)
    }
    previousNode = next
    previousLayer = layer
    if (next.left) {
      frontier.push([next.left, layer + 1])
    }
    if (next.right) {
      frontier.push([next.right, layer + 1])
    }
  }
  process.stdout.write(`${previousNode.key}`)
  process.stdout.write("\n")
}

async function main() {
  const input = await readInput()
  const treeData = input.split(",")
  const tree = buildTree(treeData)

  console.log("\nLeft Edge")
  printLeftEdge(tree)

  console.log("\nRight Edge")
  printRightEdge(tree)
}

main()
