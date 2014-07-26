/*
There are N children standing in a line. Each child is assigned a rating value.

You are giving candies to these children subjected to the following requirements:

Each child must have at least one candy.
Children with a higher rating get more candies than their neighbors.
What is the minimum candies you must give?
e.g, giving: rating = [1 3 3 2 1], the result is [1 2 3 2 1], sum = 9
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
    var data = lines[0].trim().split(/\s+/).map(function(s){return parseInt(s);});
    console.log(candy(data));
  }else{
    throw "Data input should be string.";
  }
}

function candy(data){
  var i;
  var len = data.length;
  var result = Array(data.length);
  for(i=0;i<len;i++) result[i] = 1;
  for(i=1;i<len;i++){
    if (data[i] > data[i-1]){
      result[i] = result[i-1] + 1;
    }
  }
  for(i=len-2;i>=0;i--){
    if (data[i] > data[i+1]){
      result[i] = result[i+1] + 1;
    }
  }
  console.log(result);
  var sum = 0;
  for(i=0;i<len;i++) sum += result[i];
  return sum;
}
