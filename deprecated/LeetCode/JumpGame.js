// Given an array of non-negative integers, you are initially positioned at the first index of the array.
// Each element in the array represents your maximum jump length at that position.
// Determine if you are able to reach the last index.
// For example:
// A = [2,3,1,1,4], return true.
// A = [3,2,1,0,4], return false.
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
    var data = lines[0].trim().split(/\s+/).map(function(s){return parseInt(s);});
    console.log(canJump(data));
    console.log(canJumpOn(data));
  }else{
    throw "Data input should be string.";
  }
}

// brute recursion way
function canJump(data, pos){
  if (Object.keys(arguments).length < 2){
    pos = 0; 
  }
  if (data[pos] < 1){
    return false;
  }
  if (pos==data.length-1){
    return true;
  }
  for (var i=1;i<=data[pos];i++){
    if (canJump(data, pos+i)){
      return true;
    }
  }
  return false;
}

// O(n) way
function canJumpOn(data){
  var farestPoint = 0;
  for (var i=0;i<data.length && i<= farestPoint;i++){
    if (i+data[i] > farestPoint) farestPoint = i + data[i];
    if (farestPoint>=data.length-1) return true;
  }
  return farestPoint>=data.length-1;
}
