// Given n pairs of parentheses, write a function to generate all combinations of well-formed parentheses.
// For example, given n = 3, a solution set is:
// "((()))", "(()())", "(())()", "()(())", "()()()"
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
    console.log(generate(parseInt(lines[0])));
  }else{
    throw "Data input should be string.";
  }
}

function generate(n){
  if (n===0){
    return [];
  }else if (n==1){
    return ["()"];
  }
  var result = [];
  var subResult = generate(n-1);
  var prefix, suffix;
  for (var i=0;i<subResult.length;i++){
    prefix = subResult[i] + "()";
    suffix = "()" + subResult[i];
    if (prefix==suffix){
      result.push(prefix);
    }else{
      result.push(prefix);
      result.push(suffix);
    }
    result.push("(" + subResult[i] + ")");
  }
  return result;
}
