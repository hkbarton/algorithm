// Given a string s and a dictionary of words dict, determine if s can be segmented into a space-separated sequence of one or more dictionary words.
// For example, given s = "leetcode", dict = ["leet", "code"].
// Return true because "leetcode" can be segmented as "leet code".
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
    var s = lines[0];
    lines.shift();
    console.log(wordBreak(s, lines));
  }else{
    throw "Data input should be string.";
  }
}

function wordBreak(s, dict){
  if (s.length===0){
    return true;
  }
  var result = false;
  var prefix = '';
  for (var i=0;i<dict.length;i++){
    prefix = s.substr(0, dict[i].length);
    if (prefix==dict[i]){
      result = true && wordBreak(s.substring(dict[i].length, s.length), dict);
    }
  }
  return result;
}
