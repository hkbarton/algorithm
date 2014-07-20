// sum zero problem
// 1. find 2 number sum=0 in a array
// 2. find 3 number sum=0 in a array
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
    var dataStrs = lines[0].trim().split(/\s+/);
    var data = [];
    for(var i=0;i<dataStrs.length;i++){
      data.push(parseInt(dataStrs[i]));
    }
    console.log(sum2zero(data));
    console.log(sum3zero(data));
  }else{
    throw "Data input should be string.";
  }
}

function sum2zero(data){
  var result = [];
  /* brute way
  for (var i=0;i<data.length-1;i++){
    for (var j=i+1;j<data.length;j++){
      if (data[i]+data[j]===0){
        result.push([data[i],data[j]]);
      }
    }
  }
  */
  // better
  data.sort(function(a,b){
    return a - b;
  });
  var j = 0;
  var k = data.length-1;
  while(j<k){
    if (data[j] + data[k] < 0){
      j++;
    }else if(data[j] + data[k] > 0){
      k--;
    }else{
      result.push([data[j],data[k]]);
      j++;
      k--;
    }
  }
  return result;
}

function sum3zero(data){
  var result = [];
  /* brute way
  for (var i=0;i<data.length-2;i++){
    for (var j=i+1;j<data.length-1;j++){
      for (var k=j+1;k<data.length;k++){
        if (data[i]+data[j]+data[k]===0){
          result.push([data[i],data[j],data[k]]);
        }
      }
    }
  }
  */
  // better
  data.sort(function(a,b){
    return a - b;
  });
  for (var i=0;i<data.length;i++){
    var j = i+1;
    var k = data.length-1;
    while(j<k){
      if (data[i] + data[j] + data[k] < 0){
        j++;
      }else if (data[i] + data[j] + data[k] > 0){
        k--;
      }else{
        result.push([data[i],data[j],data[k]]);
        j++;
        k--;
      }
    }
  }
  return result;
}
