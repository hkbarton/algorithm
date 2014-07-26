/*
Given a singly linked list where elements are sorted in ascending order, convert it to a height balanced BST.
Given: 1->2->3->4->5->6->7
The result tree is:
         4
      /     \
    2        6
  /   \    /   \
1      3  5     7
output: [4 2 6 1 3 5 7]
*/
var assert = require('assert'),
    treelab = require('../treelab.js'),
    lllab = require('../linkedlistlab.js');

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
    var data = lines[0].trim().split(/\s+/).map(function(s){return parseInt(s);});
    var ll = lllab.buildLinkedListFromArray(data);
    var tree = sortedListToTree(ll);
    console.log(treelab.treeToArray(tree));
  }else{
    throw "Data input should be string.";
  }
}

// recusion version
function _sortedListToTree(array, start, end){
  var middle = Math.floor((start + end)/2);
  var tree = {key:array[middle]};
  if (end<=start + 2){
    tree.left = middle-1>=0 ? {key:array[start],left:null,right:null} : null;
    tree.right = middle+1<=end ? {key:array[end],left:null,right:null} : null;
  }else{
    tree.left = _sortedListToTree(array, start, middle-1); 
    tree.right = _sortedListToTree(array, middle + 1, end); 
  }
  return tree;
}

function sortedListToTree(ll){
  var array = [];
  var item = ll;
  while(item!==null){
    array.push(item.key); 
    item = item.next;
  }
  return _sortedListToTree(array, 0, ll.length-1);
}
