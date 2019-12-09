/*
Given a matrix of m x n elements (m rows, n columns), return all elements of the matrix in spiral order.

For example,
Given the following matrix:

[
 [ 1, 2, 3 ],
 [ 4, 5, 6 ],
 [ 7, 8, 9 ]
]
You should return [1,2,3,6,9,8,7,4,5].
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
      console.log(e.stack);
      process.exit(1);
    }
  });
})();

function processInput(input){
  if (typeof input == "string"){
    var lines = input.trim().split('\n');
    var matrix = [];
    var toInt = function(s){
      return parseInt(s);
    };
    for(var i=0;i<lines.length;i++){
      matrix.push(lines[i].trim().split(/\s+/).map(toInt));
    }
    console.log(spiralOrder(matrix));
  }else{
    throw "Data input should be string.";
  }
}

function spiralOrder(matrix){
  if (matrix.length < 2) return matrix[0];
  var m = matrix.length - 1;
  var n = matrix[0].length - 1;
  var startPoint = [0,0];
  var step = [0,0];
  var border = 0;
  var dir = [0,1];
  var result = [];
  var i=0;
  while(i<(m+1)*(n+1)){
    result.push(matrix[step[0]][step[1]]);
    i++;
    step[0] += dir[0];
    step[1] += dir[1];
    if (step[0]==startPoint[0] && step[1]==startPoint[1]){
      step[0] -= dir[0];
      dir[0] = 0;
      dir[1] = 1;
      step[1] += dir[1];
      border++;
      startPoint[0] = step[0];
      startPoint[1] = step[1];
    }else{
      if ((dir[1]==1 && step[1]>n-border) ||
        (dir[1]==-1 && step[1]<border)){
        step[1] -= dir[1];
        dir[0] = dir[0] + dir[1];
        dir[1] = 0;
        step[0] += dir[0];
      }else if((dir[0]==1 && step[0]>m-border) ||
        (dir[0]==-1 && step[0]<border)){
        step[0] -= dir[0];
        dir[1] = dir[1] - dir[0];
        dir[0] = 0;
        step[1] += dir[1];
      }
    }
  }
  return result;
}
