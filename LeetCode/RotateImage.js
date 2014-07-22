// You are given an m x n 2D matrix representing an image.
// Rotate the image by 90 degrees (clockwise).
// do this in-place
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
    console.log(data);
    console.log(rotate(data));
  }else{
    throw "Data input should be string.";
  }
}

function rotate(data){
  var i,j;
  var m = data[0].length;
  var n = data.length;
  var newSize = Math.max(m,n);
  // make matrix square
  if (m > n){
    var addArray;
    for(i=0;i<m-n;i++){
      addArray = [];
      for (j=0;j<m;j++) addArray.push(0);
      data.push(addArray);
    }
  }else if (m < n){
    for (i=0;i<n;i++){
      for (j=0;j<n-m;j++){
        data[i].push(0);
      }
    }
  }
  // in-place rotate
  // 1. flip bottom up 
  data.reverse();
  // 1. flip bottom right, do swap
  for (i=0;i<newSize;i++){
    for (j=i+1;j<newSize;j++){
      //swpe
      var tmp = data[j][i];
      data[j][i] = data[i][j];
      data[i][j] = tmp;
    }
  }
  // clear 0 member
  if (newSize > m){
    for (i=0;i<newSize-m;i++){
      data.pop();
    }
  }else if (newSize > n){
    for (i=0;i<m;i++){
      for (j=0;j<newSize-n;j++) data[i].shift(); 
    }
  }
  return data; 
}
