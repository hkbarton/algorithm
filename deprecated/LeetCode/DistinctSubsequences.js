// Given a string S and a string T, count the number of distinct subsequences of T in S.
// A subsequence of a string is a new string which is formed from the original string by deleting some (can be none) of the characters without disturbing the relative positions of 
// the remaining characters. (ie, "ACE" is a subsequence of "ABCDE" while "AEC" is not).
// S = "rabbbit", T = "rabbit" return 3

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
    console.log(distinctSubsequences(lines[0], lines[1]));
  }else{
    throw "Data input should be string.";
  }
}

// m = s.length; n = t.length
// DP: fun(s[m], t[n]) = fun(s[m-1], t[n]) + 
//  fun(s[m-1],t[n-1]) if s[m]==t[n]
//  0 if s[m]!=s[n]
// fun(s[m], t[0]) = 1
// fun(s[0], t[n]) = 0
function distinctSubsequences(s, t){
  var i,j;
  var m = s.length;
  var n = t.length;
  if (n>m) return 0;
  var result = Array(m+1);
  for(i=0;i<=m;i++){
    result[i] = Array(n+1);
    result[i][0] = 1;
  }
  for (i=1;i<=n;i++){ // 0,0 = 1
    result[0][i] = 0;
  }
  for (i=1;i<=m;i++){
    for (j=1;j<=n;j++){
      result[i][j] = result[i-1][j] + 
        (s[i-1]==t[j-1] ? result[i-1][j-1] : 0);
    }
  }
  return result[m][n];
}
