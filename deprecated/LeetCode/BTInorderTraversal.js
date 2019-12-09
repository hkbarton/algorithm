// Given a binary tree, return the inorder traversal of its nodes' values.

var treelib = require('../treelab.js');

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
      console.log(e);
      process.exit(1);
    }
  });
})();

function processInput(input){
  if (typeof input == "string"){
    //var lines = input.replace(/^\s+|\s+$/g,"").split("\n"); // trim
    var lines = input.trim().split('\n');
    var treeData = lines[0].trim().split(/\s+/);
    var tree = treelib.buildTree(treeData);
    console.log(recurseInorder(tree));
    console.log(iterationInorder(tree));
  }else{
    throw "Data input should be string.";
  }
}

function recurseInorder(tree){
  var result = [];
  if (tree.left){
    result = result.concat(recurseInorder(tree.left));
  }
  result.push(tree.key);
  if (tree.right){
    result = result.concat(recurseInorder(tree.right));
  }
  return result;
}

function iterationInorder(tree){
  var result = [];
  var handle = [];
  handle.push(tree);
  while(handle.length > 0){
    var item = handle[handle.length-1]; // don't pop, just check stack top
    if (!item.left && !item.right){ // is leaf
      result.push(handle.pop().key);
      continue;
    }
    if (item.left && !item.hasDoneLeft){
      item.hasDoneLeft = true;
      handle.push(item.left);
    }else if (!item.left || item.hasDoneLeft){
      result.push(handle.pop().key);
      if (item.right){
        handle.push(item.right);
      }
    }
  }
  return result;
}
