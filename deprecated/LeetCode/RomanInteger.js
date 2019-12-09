// Covert Roman number to Integer
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
    console.log(romanToNumber(lines[0]));
  }else{
    throw "Data input should be string.";
  }
}

function romanToNumber(roman){
  var romanDigital = '';
  var digital = 0;
  var lastDigital = 0;
  var result = 0;
  for (var i=roman.length-1;i>=0;i--){
    romanDigital = roman[i];
    if (romanDigital=='I') digital = 1;
    else if (romanDigital=='V') digital = 5;
    else if (romanDigital=='X') digital = 10;
    else if (romanDigital=='L') digital = 50;
    else if (romanDigital=='C') digital = 100;
    else if (romanDigital=='D') digital = 500;
    else if (romanDigital=='M') digital = 1000;
    if (digital<lastDigital){
      result -= digital;
    }else{
      result += digital;
    }
    lastDigital = digital;
  }
  return result;
}
