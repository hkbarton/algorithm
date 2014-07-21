// Given a sorted array of integers, find the starting and ending position of a given target value.
// Your algorithm's runtime complexity must be in the order of O(log n).
// If the target is not found in the array, return [-1, -1].
// For example, Given [5, 7, 7, 8, 8, 10] and target value 8, return [3, 4].
// FIXME, if all item in array are same, this algorithm actually take O(n) time
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
    var dataStr = lines[0].trim().split(/,\s*/);
    var data = [];
    for (var i=0;i<dataStr.length;i++){
      data.push(parseInt(dataStr[i]));
    }
    var target = parseInt(lines[1]);
    searchRange(data, target);
  }else{
    throw "Data input should be string.";
  }
}

function _searchRange(data, target, start, end, result){
  if (start <= end){
    console.log('do');
    var middle = Math.floor((start+end)/2);
    if (data[middle]==target){
      if (middle<result[0] || result[0]==-1){
        result[0] = middle;
      }
      if (middle>result[1] || result[1]==-1){
        result[1] = middle;
      }
    }
    if (data[middle-1]>=target){
      _searchRange(data, target, start, middle-1, result);
    }
    if (data[middle+1]<=target){
      _searchRange(data, target, middle+1, end, result);
    }
  }
}

function searchRange(data, target){
  var result = [-1,-1];
  _searchRange(data, target, 0, data.length-1, result);
  console.log(result);
}
