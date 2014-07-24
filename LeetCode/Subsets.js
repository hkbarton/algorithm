// Given a set of distinct integers, S, return all possible subsets.
// Elements in a subset must be in non-descending order.
// The solution set must not contain duplicate subsets.
// If S = [1,2,3], a solution is:
/*
[
  [3],
  [1],
  [2],
  [1,2,3],
  [1,3],
  [2,3],
  [1,2],
  []
]
*/

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
    console.log(subsets(data));
    console.log(subsetsNonrecursion(data));
  }else{
    throw "Data input should be string.";
  }
}

function subsets(set, end){
  if (typeof end!='number'){
    end = set.length - 1;
    // sort first time
    set.sort(function(a,b){return a-b;});
  }
  var result = [];
  if (end >= 0){
    var subResult = subsets(set, end-1);
    for (var i=0;i<subResult.length;i++){
      result.push(subResult[i].slice());
      subResult[i].push(set[end]);
      result.push(subResult[i]);
    }
  }else{
    result.push([]);
  }
  return result;
}

function subsetsNonrecursion(set){
  set.sort(function(a,b){return a-b;});
  var result = Array(set.length+1);
  result[0] = [[]];
  for (var i=1;i<=set.length;i++){
    result[i] = [];
    var tmp;
    for(var j=0;j<result[i-1].length;j++){
      result[i].push(result[i-1][j]);
      tmp = result[i-1][j].slice();
      tmp.push(set[i-1]);
      result[i].push(tmp);
    }
  }
  return result[set.length];
}
