// Given a sorted array and a target value, return the index if the target is found. If not, return the index where it would be if it were inserted in order
// You may assume no duplicates in the array.
// Here are few examples.
// [1,3,5,6], 5 → 2 ; [1,3,5,6], 2 → 1 ; [1,3,5,6], 7 → 4 ; [1,3,5,6], 0 → 0
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
    console.log(search(data, target));
  }else{
    throw "Data input should be string.";
  }
}

function search(data, target){
  var start = 0;
  var end = data.length - 1;
  var middle = Math.floor((start+end)/2);
  while(start<=end){
    if (data[middle]==target){
      return middle;
    }else if (data[middle]>target){
      end = middle - 1;
      middle = Math.floor((start+end)/2);
    }else if (data[middle]<target){
      start = middle + 1;
      middle = Math.floor((start+end)/2);
    }
  }
  return start;
}
