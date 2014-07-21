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
    var number = parseInt(lines[0]);
    printBin(number);
    console.log('has odd parity bit? ans: ' + oddParity(number));
    console.log('[one line]has odd parity bit? ans: ' + String(onelineOddParity(number)===1));
  }else{
    throw "Data input should be string.";
  }
}

function printBin(number){
  var bits = [];
  while(number!==0){
    bits.push(number & 1);
    number = number >> 1;
  }
  for(var i=bits.length;i<16;i++) bits.push(0);
  console.log(bits.reverse().join(' '));
}

function oddParity(number){
  var result = false;
  while(number!==0){
    if (number & 1 === 1){
      result = !result;
    }
    number = number >> 1;
  }
  return result;
}

function evenParity(number){
  return !oddParity(number);
}

function onelineOddParity(number){
  return number!==0 ? (number & 1) ^ onelineOddParity(number>>1) : number & 1;
}
