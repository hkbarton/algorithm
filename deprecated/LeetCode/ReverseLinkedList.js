// Reverse a linked list from position m to n. Do it in-place and in one-pass.
// For example: Given 1->2->3->4->5->NULL, m = 2 and n = 4,
// return 1->4->3->2->5->NULL.
// 1 ≤ m ≤ n ≤ length of list.
var lllab = require('../linkedlistlab.js');
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
    var data = lines[0].trim().split(/\s+/).map(function(s){return parseInt(s);});
    var ll = lllab.buildLinkedListFromArray(data);
    var m = parseInt(lines[1]);
    var n = parseInt(lines[2]);
    lllab.printLinkedList(ll);
    lllab.printLinkedList(reverse(ll,m,n));
  }else{
    throw "Data input should be string.";
  }
}

function reverse(ll, m, n){
  assert(m>=1 && m<=ll.length);   
  assert(n>=1 && n<=ll.length);
  assert(n>=m);
  var result = ll;
  var pos = 1;
  var beforeFist;
  var tmp, prev;
  var item = ll;
  var first = ll;
  while(pos<=n){
    if (pos+1==m){
      beforeFist = item;
      first = item.next;
    }
    if (pos>m && pos<=n){
      tmp = item.next;
      item.next = prev;
      if (pos==n){
        if (beforeFist){
          beforeFist.next = item;
        }else{
          result = item;
        }
        first.next = tmp;
      }
      prev = item;
      item = tmp;
      pos++;
    }else{
      prev = item;
      item = item.next;
      pos++;
    }
  }
  return result;
}
