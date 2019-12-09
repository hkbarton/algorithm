// Given two binary strings, return their sum (also a binary string).
// For example, a = "11" b = "1"  Return "100".
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
    console.log(addBinary(lines[0], lines[1]));
  }else{
    throw "Data input should be string.";
  }
}

function addBinary(a, b){
  var apos = a.length - 1;
  var bpos = b.length - 1;
  var idx = a.length > b.length ? apos : bpos;
  var adig, bdig;
  var result = '';
  var value, last = 0;
  while(idx >=0){
    adig = apos >= 0 ? parseInt(a[apos]) : 0;
    bdig = bpos >= 0 ? parseInt(b[bpos]) : 0;
    value = adig + bdig + last;
    last = 0;
    if (value > 1){
      value = value - 2;
      last = 1;
    }
    result = String(value) + result;
    apos--;
    bpos--;
    idx--;
  }
  if (last > 0){
    result = String(last) + result;
  }
  return result;
}
