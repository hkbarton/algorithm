// Given a string s, partition s such that every substring of the partition is a palindrome.
// Return all possible palindrome partitioning of s.
// For example, given s = "aab",
// Return [ ["aa","b"], ["a","a","b"] ]
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
    var pdict = {};
    var dict = {};
    var result = partition(lines[0], dict, pdict);
    console.log(result);
  }else{
    throw "Data input should be string.";
  }
}

// DP
function partition(s, dict, pdict){
  if (typeof s!='string'){
    return;
  }
  if (dict[s] instanceof Array){
    // return from cache
    var res = [];
    for (var k=0;k<dict[s].length;k++){
      res.push(dict[s][k].slice());
    }
    return res;
  }
  var result = [];
  if (s.length===0){
    result.push([]);
  }else{
    var end = s.length - 1;
    for (var i=end;i>=0;i--){
      var subStr = s.substring(0, i+1);
      if (isPalindrome(subStr, pdict)){
        var subResult = partition(s.substring(i+1, end+1), dict, pdict);
        for (var j=0;j<subResult.length;j++){
          subResult[j].unshift(subStr);
          result.push(subResult[j]);
        }
      }
    }
    // save to cache
    var tmp = [];
    for(i=0;i<result.length;i++){
      tmp.push(result[i].slice());
    }
    dict[s] = tmp;
  }
  return result;
}

function isPalindrome(s, dict){
  if (dict && typeof dict[s] == 'boolean'){
    return dict[s]; 
  }
  var head = 0;
  var tail = s.length - 1;
  while(head<tail){
    if (s[head]!=s[tail]){
      return false;
    }
    head++;
    tail--;
  }
  return true;
}
