// Given numRows, generate the first numRows of Pascal's triangle.
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
    generate(parseInt(lines[0]));
  }else{
    throw "Data input should be string.";
  }
}

function generate(num){
  var data = [];
  data.push([1]);
  for (var i=1;i<num;i++){
    var array = [];
    for (var j=0;j<=i;j++){
      if (j===0 || j>=data[i-1].length){
        array.push(1);
      }else{
        array.push(data[i-1][j-1] + data[i-1][j]); 
      }
    }
    data.push(array);
  }
  console.log(data);
}
