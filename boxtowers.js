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
    var lines = input.replace(/^\s+|\s+$/g,"").split("\n");
    var acceptCnt = parseInt(lines[0]);
    if (isNaN(acceptCnt)){
      throw "First line of input should be a number.";
    }
    if (lines.length < acceptCnt + 1){
      throw "Input data is not enough.";
    }
    if (acceptCnt > 20){
      throw "Boxs should no more than 20";
    }
    var data = [];
    var item = [];
    var width, height, length;
    for (var i=1;i<=acceptCnt;i++){
      item = lines[i].replace(/^\s+|\s+$/g,"").split(/\s+/);
      if (item.length!=3){
        throw "Input line " + i + " have invalidate data.";
      }
      width = parseInt(item[0]);
      height = parseInt(item[1]);
      length = parseInt(item[2]);
      if (isNaN(width) || isNaN(height) || isNaN(length)){
        throw "Input line " + i + " have invalidate data, should include 3 numbers.";
      }
      if (width>=1 && width<=100 && height>=1 && 
        height<=100 && length>=1 && length<=100){
        data.push([width, height, length]);
      }else{
        throw "Input line " + i + " have invalidate data, numbers should between 1 and 100.";
      }
    }
    calulate(data);
  }else{
    throw "Data input should be string.";
  }
}

function calulate(data){
  
}

