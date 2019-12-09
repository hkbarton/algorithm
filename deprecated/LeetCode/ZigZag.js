/*
The string "PAYPALISHIRING" is written in a zigzag pattern on a given number of rows like this: (you may want to display this pattern in a 
fixed font for better legibility)
P   A   H   N
A P L S I I G
Y   I   R
And then read line by line: "PAHNAPLSIIGYIR"
Write the code that will take a string and make this conversion given a number of rows:
convert("PAYPALISHIRING", 3) should return "PAHNAPLSIIGYIR".
if row number 4: 
P     I     N
A   L S   I G
Y A   H R
P     I
*/

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
    var data = lines[0].trim();
    var row = parseInt(lines[1]);
    console.log(zigzagConvert(data,row));    
  }else{
    throw "Data input should be string.";
  }
}

function zigzagConvert(s, row){
  if (row < 2){
    return s;
  }
  var store = Array(row);
  for (var i=0;i<row;i++){
    store[i] = '';
  }
  var pos = 0;
  var rowCnt = 0;
  var dir = 0;
  while(pos<s.length){
    store[rowCnt] += s[pos++];
    rowCnt = dir===0 ? rowCnt+1 : rowCnt-1;
    if (dir===0 && rowCnt==row){
      dir = 1;
      rowCnt-=2;
    }else if(dir===1 && rowCnt<0){
      dir = 0;
      rowCnt+=2;
    }
  }
  return store.join('');
}
