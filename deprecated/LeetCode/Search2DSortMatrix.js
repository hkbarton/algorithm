// Write an efficient algorithm that searches for a value in an m x n matrix. This matrix has the following properties:
// Integers in each row are sorted from left to right.
// The first integer of each row is greater than the last integer of the previous row.
// For example, Consider the following matrix:
/*
[
  [1,   3,  5,  7],
  [10, 11, 16, 20],
  [23, 30, 34, 50]
]
Given target = 3, return true.
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
    var data = Array(lines.length-1);
    var toInt = function(s){
      return parseInt(s);
    };
    for (var i=0;i<lines.length-1;i++){ 
      data[i] = lines[i].trim().split(/\s+/).map(toInt);
    }
    var target = parseInt(lines[lines.length-1]);
    console.log(search(data, target));
  }else{
    throw "Data input should be string.";
  }
}

function search(matrix, target){
  // find the row
  var start = 0;
  var end = matrix.length-1;
  var middle = Math.floor((start + end)/2);
  var value, row;
  while(start<=end){
    value = matrix[middle][0];
    if (value==target){
      return true; //lucky
    }
    if (value>target){
      end = middle - 1;
      row = end;
    }else{ // value < target
      start = middle + 1;
      if (start >= matrix.length){
        row  = middle;
        break;
      }else{
        row = matrix[start][0] > target ? middle : start;
      }
    }
    middle = Math.floor((start + end)/2);
  }
  // find col
  start = 0;
  end = matrix[0].length - 1;
  middle = Math.floor((start + end)/2);
  while(start<=end){
    value = matrix[row][middle];
    if (value==target){
      return true;
    }
    if (value>target){
      end = middle - 1;
    }else{ // value < target
      start = middle + 1;
    }
    middle = Math.floor((start + end)/2);
  }
  return false;
}
