// Given a triangle, find the minimum path sum from top to bottom. Each step you may move to adjacent numbers on the row below.
// For example, given the following triangle
// [
//      [2],
//     [3,4],
//    [6,5,7],
//   [4,1,8,3]
// ]
// The minimum path sum from top to bottom is 11 (i.e., 2 + 3 + 5 + 1 = 11).
// Bonus point if you are able to do this using only O(n) extra space, where n is the total number of rows in the triangle.
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
    console.log(minimalNonRecusion(data));
  }else{
    throw "Data input should be string.";
  }
}

// ------------ recusion version, using O(1) space
function _minimal(data, idx, pos){
  if (idx===0){
    return data[0][0];
  }
  if (pos<0 || pos>=data[idx].length){
    return Number.MAX_VALUE; 
  }
  return Math.min(data[idx][pos] + _minimal(data, idx-1, pos),
    data[idx][pos] + _minimal(data, idx-1, pos-1));
}

function minimumTotal(data){
  var n = data.length;
  var minResult = Number.MAX_VALUE;
  var tmp;
  for (var i=0;i<n;i++){
    tmp = _minimal(data, n-1, i);
    if (tmp < minResult){
      minResult = tmp;
    }
  }
  return minResult;
}

// ------------- non recusion DP version, need n*n space
function minimalNonRecusion(data){
  var i,j;
  var n = data.length;
  var result = Array(n);
  for (i=0;i<n;i++){
    result[i] = Array(n);
    result[0][i] = Number.MAX_VALUE;
  }
  result[0][0] = data[0][0];
  var tmp;
  for (i=1;i<n;i++){
    for (j=0;j<n;j++){
      if (j>=data[i].length){
        result[i][j] = Number.MAX_VALUE;
      }else{
        result[i][j] = data[i][j] + Math.min(result[i-1][j], j>0 ? result[i-1][j-1]:Number.MAX_VALUE);
      }
    }
  }
  // return result;
  var minResult = Number.MAX_VALUE;
  for (i=0;i<result[n-1].length;i++){
    if (result[n-1][i] < minResult){
      minResult = result[n-1][i];
    }
  }
  return minResult;
}
