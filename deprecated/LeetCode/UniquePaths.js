// A robot is located at the top-left corner of a m x n grid (marked 'Start' in the diagram below).
// he robot can only move either down or right at any point in time. The robot is trying to reach the bottom-right corner of the grid
// How many possible unique paths are there?
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
    console.log(cal(parseInt(lines[0]), parseInt(lines[1])));
  }else{
    throw "Data input should be string.";
  }
}

// DP f(m,n) = f(m,n-1) + f(m-1,n)
// f(0,n) = 0; f(m,0) = 0; f(1,1) = 1;
function cal(m,n){
  /* use m*n space
  var result = Array(m+1);
  var i,j;
  for (i=0;i<=m;i++){
    result[i] = Array(n+1);
    result[i][0] = 0;
  }
  for (i=0;i<=n;i++){
    result[0][i] = 0;
  }
  for (i=1;i<=m;i++){
    for (j=1;j<=n;j++){
      if (i==1 && j==1){
        result[i][j] = 1;
      }else{
        result[i][j] = result[i][j-1] + result[i-1][j];
      }
    }
  }
  return result[m][n];
  */
  // use n+1 space
  var i,j;
  var result = Array(n+1);
  for (i=0;i<result.length;i++){
    result[i] = 0;
  }
  for (i=1;i<=m;i++){
    for (j=1;j<=n;j++){
      if (i==1 && j==1){
        result[j] = 1;
      }else{
        result[j] = result[j] + result[j-1];
      }
    }
  }
  return result[n];
}
