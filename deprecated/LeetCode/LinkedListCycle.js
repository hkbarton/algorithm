// Given a linked list, determine if it has a cycle in it.
// Follow up: Can you solve it without using extra space?
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
    var ll = require('../linkedlistlab.js').buildLinkedListFromArray(data);
    console.log(hasCycle(ll));
  }else{
    throw "Data input should be string.";
  }
}

function hasCycle(ll){
  var fast = ll;
  var slow = ll;
  while(fast!==null && fast.next!==null){
    slow = slow.next;
    fast = fast.next.next;
    if (slow==fast){
      return true;
    }
  }
  return false;
}
