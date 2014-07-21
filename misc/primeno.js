// check if a number is prime

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
    console.log(isPrime(parseInt(lines[0])));    
  }else{
    throw "Data input should be string.";
  }
}

function isPrime(number){
  if (number <= 1) return false;
  for (var i=2;i*i<number;i++){
    if (number % i===0) return false;
  }
  return true;
}
