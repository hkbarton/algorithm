// Find the contiguous subarray within an array (containing at least one number) which has the largest sum.
// For example, given the array [−2,1,−3,4,−1,2,1,−5,4], the contiguous subarray [4,−1,2,1] has the largest sum = 6.
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
    var data = lines[0].trim().split(/\s+/).map(function(s){return parseInt(s);});
    console.log(maxSubArray(data));
    console.log(maxSubArrayDP(data));
  }else{
    throw "Data input should be string.";
  }
}

// strait forward implemention
function maxSubArray(data){
  var max = Number.MIN_VALUE;
  var result = [];
  var tmp = [];
  var sum = 0;
  for (var i=1;i<=data.length;i++){
    for (var j=0;j<=data.length - i;j++){
      sum = 0;
      tmp = [];
      for (var k=j;k<j+i;k++){
        sum += data[k]; 
        tmp.push(data[k]);
      }
      if (sum>max){
        max = sum;
        result = tmp.slice();
      }
    }
  }
  return result;
}

// O(n) DP solution
// f(n) = max(f(n-1) + data[n], data[n]);
function maxSubArrayDP(data){
  var sum = Array(data.length);
  sum[0] = data[0];
  var resultValue = sum[0];
  var result = Array(data.length);
  result[0] = [data[0]];
  var resultIndex = 0;
  for (var i=1;i<data.length;i++){
    if (sum[i-1] + data[i] > data[i]){
      sum[i] = sum[i-1] + data[i];
      result[i] = result[i-1].slice(); // FIXME: how to copy array in O(1) time?
      result[i].push(data[i]);
    }else{
      sum[i] = data[i];
      result[i] = [data[i]];
    }
    if (sum[i] > resultValue){
      resultValue = sum[i];
      resultIndex = i;
    }
  }
  return result[resultIndex];
}
