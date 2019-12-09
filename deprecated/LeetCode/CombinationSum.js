// Given a set of candidate numbers (C) and a target number (T), find all unique combinations in C where the candidate numbers sums to T.
// The same repeated number may be chosen from C unlimited number of times.
// All numbers (including target) will be positive integers.
// Elements in a combination (a1, a2, … , ak) must be in non-descending order. (ie, a1 ≤ a2 ≤ … ≤ ak).
// The solution set must not contain duplicate combinations.
// For example, given candidate set 2,3,6,7 and target 7, 
// A solution set is:  [7] [2, 2, 3] 
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
    var target = parseInt(lines[1]);
    console.log(combinSum(data, target));
  }else{
    throw "Data input should be string.";
  }
}

function combinSum(data, target){
  var result = [];
  var i,j,k;
  var ele = 0;
  var temp, subResult;
  for (i=0;i<data.length;i++){
    if (data[i]==target){
      result.push([data[i]]);
    }
    temp = data.slice();
    ele = data[i];
    subResult = [];
    while(temp[i] + ele <= target){
      j = i;
      subResult.push(ele);
      while(j<data.length && (temp[j] + ele)<=target){
        temp[j] += ele;
        if (temp[j]==target){ // found
          result.push(subResult.slice());
          result[result.length-1].push(data[j]);
        }
        j++;
      }
    }
  }
  return result;
}
