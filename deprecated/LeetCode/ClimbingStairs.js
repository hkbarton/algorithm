// You are climbing a stair case. It takes n steps to reach to the top.
// Each time you can either climb 1 or 2 steps. In how many distinct ways can you climb to the top?
// input the height of stair, output how many distinct ways
// tip: simple DP problem

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
    console.log(calClimbing(parseInt(lines[0])));
  }else{
    throw "Data input should be string.";
  }
}

function calClimbing(height){
  // DP: fun(n) = fun(n-1) + fun(n-2);
  if (height < 2) return height;
  var mem = Array(height);
  mem[0] = 1; // only 1 height stair;
  mem[1] = 2; // only 2 height stair;
  for (var i=2;i<height;i++){
    mem[i] = mem[i-1] + mem[i-2];
  }
  return mem[height - 1];
}
