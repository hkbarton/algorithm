/*
Given a binary tree, return the bottom-up level order traversal of its nodes' values. (ie, from left to right, level by level from leaf to root).

For example:
Given binary tree {3,9,20,#,#,15,7},
    3
   / \
  9  20
    /  \
   15   7
return its bottom-up level order traversal as:
[
  [15,7],
  [9,20],
  [3]
]
*/
var tl = require('../treelab.js');
var assert = require('assert');

(function main(){
  var sInput = "";
  process.stdin.resume();
  process.stdin.setEncoding("ascii");
  process.stdin.on("data", function(input){
    sInput += input;
  });
  process.stdin.on("end", function(){
    //try{
      processInput(sInput); 
    //}catch(e){
      //console.log(e);
      //process.exit(1);
    //}
  });
})();

function processInput(input){
  if (typeof input == "string"){
    //var lines = input.replace(/^\s+|\s+$/g,"").split("\n"); // trim
    var lines = input.trim().split('\n');
    var tree = tl.buildTree(lines[0].trim().split(/\s+/));
    console.log(travesal(tree));
  }else{
    throw "Data input should be string.";
  }
}

function travesal(tree){
  assert(tree instanceof Object);
  var result = [[]];
  var queue = [{node:tree, level:0}];
  var item;
  var handle = result[result.length-1];
  var curLevel = 0;
  while(queue.length > 0){
    item = queue.shift();
    if (item.level > curLevel){
      curLevel = item.level;
      result.push([]);
      handle = result[result.length-1];
    }
    handle.push(item.node.key);
    if (item.node.left instanceof Object){
      queue.push({node:item.node.left, level:item.level+1});
    }
    if (item.node.right instanceof Object){
      queue.push({node:item.node.right, level:item.level+1});
    }
  }
  return result.reverse();
}
