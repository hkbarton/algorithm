/*
Given a binary tree containing digits from 0-9 only, each root-to-leaf path could represent a number.

An example is the root-to-leaf path 1->2->3 which represents the number 123.

Find the total sum of all root-to-leaf numbers.

For example,

    1
   / \
  2   3
The root-to-leaf path 1->2 represents the number 12.
The root-to-leaf path 1->3 represents the number 13.

Return the sum = 12 + 13 = 25.
*/
var assert = require('assert'),
    treelab = require('../treelab.js');

(function main(){
  var sInput = "";
  process.stdin.resume();
  process.stdin.setEncoding("ascii");
  process.stdin.on("data", function(input){
    sInput += input;
  });
  process.stdin.on("end", function(){
    try{
      processInput(sInput); 
    }catch(e){
      console.log(e.stack);
      process.exit(1);
    }
  });
})();

function processInput(input){
  if (typeof input == "string"){
    //var lines = input.replace(/^\s+|\s+$/g,"").split("\n"); // trim
    var lines = input.trim().split('\n');
    var tree = treelab.buildTree(lines[0].trim().split(/\s+/));
    console.log(sumNumbers(tree));
  }else{
    throw "Data input should be string.";
  }
}

function sumNumbers(tree, resultStr, result){
  assert(tree instanceof Object);
  if (typeof resultStr !== 'string'){
    resultStr = '';
  }
  if (typeof result !== 'number'){
    result = 0;
  }
  resultStr += tree.key;
  if (!tree.left && !tree.right){
    result += parseInt(resultStr);
  }else{
    if (tree.left) result = sumNumbers(tree.left, resultStr, result); 
    if (tree.right) result = sumNumbers(tree.right, resultStr, result); 
  }
  return result;
}
