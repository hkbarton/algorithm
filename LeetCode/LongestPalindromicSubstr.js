/* Given a string S, find the longest palindromic substring in S. 
You may assume that the maximum length of S is 1000, and there exists one unique longest palindromic substring.
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
    //var lines = input.replace(/^\s+|\s+$/g,"").split("\n"); // trim
    var lines = input.trim().split('\n');
    console.log(longestPalindrome(lines[0].trim()));
  }else{
    throw "Data input should be string.";
  }
}

// brute way, O(n^3)
function longestPalindrome(s){
  var dict = {};
  var len = s.length;
  var subStr = '';
  for (var i=len;i>=1;i--){
    for (var j=0;j<=len-i;j++){
      subStr = s.substr(j,i);
      if (isPalindrome(subStr, dict)){
        return subStr; 
      }
    }
  }
  return '';
}

// TODO DP O(n^2) solution

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
