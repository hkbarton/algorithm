// Write a function to find the longest common prefix string amongst an array of strings.
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
    console.log(getLongestCommonPrefix(lines));    
  }else{
    throw "Data input should be string.";
  }
}

function getLongestCommonPrefix(data){
  var start = 0;
  var result = [];
  var prefixChar;
  var stop = false;
  while(!stop){
    prefixChar = data[0][start];  
    for (var i=1;i<data.length;i++){
      if (data[i].length < start+1 || data[i][start]!=prefixChar){
        stop = true;
        break;
      }
    }
    if (!stop){
      result.push(prefixChar);
    }
    start++;
  }
  return result.join('');
}
