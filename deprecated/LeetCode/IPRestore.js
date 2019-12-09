// Given a string containing only digits, restore it by returning all possible valid IP address combinations.
// For example: Given "25525511135", return ["255.255.11.135", "255.255.111.35"]. (Order does not matter)
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
    var result = restore(lines[0]);
    var ipresult = [];
    for (var i=0;i<result.length;i++){
      ipresult.push(result[i].join('.'));
    }
    console.log(ipresult);
  }else{
    throw "Data input should be string.";
  }
}

function restore(s, level){
  if (typeof level != 'number'){
    level = 1;
  }
  var result = [];
  if (s.length===0){
    result.push([]);
  }else{
    var len = s.length;
    for (var i=1;i<=3;i++){
      var sub = s.substring(0,i);
      if (parseInt(sub)<=255 &&
        len-i <= 3 * (4-level) && len-i >= 4-level){
        var subResult = restore(s.substring(i, len), level+1); 
        for (var j=0;j<subResult.length;j++){
          subResult[j].unshift(sub);
          result.push(subResult[j]);
        }
      }
    }
  }
  return result;
}
