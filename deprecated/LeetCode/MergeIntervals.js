/*
Given a collection of intervals, merge all overlapping intervals.

For example,
Given [1,3],[2,6],[8,10],[15,18],
return [1,6],[8,10],[15,18].
*/
var assert = require('assert');
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
    var data = [];
    var toInt = function(s){
      return parseInt(s);
    };
    for (var i=0;i<lines.length;i++){
      data.push(lines[i].trim().split(/\s+/).map(toInt));
    }
    console.log(mergeInterval(data));
  }else{
    throw "Data input should be string.";
  }
}


function mergeInterval(data){
  assert(data instanceof Array && data.length>0);
  var last = [data[0]];
  var result = last;
  var idx;
  for (var i=1;i<data.length;i++){
    idx = last.length - 1;
    if(data[i][0] <= last[idx][1]){ // need merge
      result = last.slice(0,idx);
      result.push([last[idx][0],data[i][1]]);
    }else{
      result = last.slice();
      result.push(data[i]);
    }
    last = result;
  }
  return result;
}
