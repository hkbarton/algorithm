// Longest Common Subsequence
// recusion funciton:
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
    var lines = input.replace(/^\s+|\s+$/g,"").split("\n");
    if (lines.length > 2){
      throw "Only accept two input string.";
    }
    LCS(lines[0], lines[1]);
  }else{
    throw "Data input should be string.";
  }
}

// LCS(Xi, Yj) = 0  ; if i==0 or j==0
// LCS(Xi, Yj) = LCS(Xi-1, Yj-1) + 1  ; if Xi==Yj
// LCS(Xi, Yj) = MAX(LCS(Xi,Yj-1), LCS(Xi-1,Yj))  ; if Xi!=Yj
function LCS(x, y){
  var lenx = x.length,
      leny = y.length;
  var result = new Array(lenx+1);
  var lcs = new Array(lenx+1);
  var i = 0,
      j = 0;
  for (i=0;i<=lenx;i++){
    result[i] = new Array(leny+1);
    lcs[i] = new Array(leny+1);
  }
  for (i=0;i<=lenx;i++){
    result[i][0] = 0;
    lcs[i][0] = "";
  }
  for (j=0;j<=leny;j++){
    result[0][j] = 0;
    lcs[0][j] = "";
  }
  for (i=1;i<=lenx;i++){
    for (j=1;j<=leny;j++){
      if (x[i-1]==y[j-1]){
        result[i][j] = result[i-1][j-1] + 1;
        lcs[i][j] = lcs[i-1][j-1] + x[i-1];
      }else{
        if (result[i][j-1] > result[i-1][j]){
          result[i][j] = result[i][j-1];
          lcs[i][j] = lcs[i][j-1];
        }else{
          result[i][j] = result[i-1][j];
          lcs[i][j] = lcs[i-1][j];
        }
      }
    }
  }
  console.log("Length of LCS is: " + result[lenx][leny]);
  console.log("LCS: " + lcs[lenx][leny]);
}
