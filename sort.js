var _data = [2,5,1,13,15,21,32,35,33,56,78,21,34,30,55];

function bubbleSort(input){
  input = input.slice(0);
  for (var i=0;i<input.length;i++){
    for (var j=0;j<input.length-i-1;j++){
      if (input[j]>input[j+1]){
        var temp = input[j];
        input[j] = input[j+1];
        input[j+1] = temp;
      }
    }
  }
  return input;
}

function insertSort(input){
  input = input.slice(0);
  for (var i=1;i<input.length;i++){
    var temp = input[i];
    var j = i - 1;
    while(j>=0 && input[j]>temp){
      input[j+1] = input[j];
      j--;
    }
    input[j+1] = temp;
  }
  return input;
}

function mergeSort(input){
  input = input.slice(0);
  return input;
}

function quickSort(input){
  input = input.slice(0);
  return input;
}

function bucketSort(input){
  input = input.slice(0);
  return input;
}

console.log("bubble sort");
var begin = new Date().getTime();
console.log(bubbleSort(_data).join());
for(var i=0;i<1000000;i++) bubbleSort(_data);
console.log("cost:" + (new Date().getTime() - begin).toString());

process.stdout.write('\n');
console.log("insertion sort");
var begin = new Date().getTime();
console.log(insertSort(_data).join());
for(var i=0;i<1000000;i++) insertSort(_data);
console.log("cost:" + (new Date().getTime() - begin).toString());

process.stdout.write('\n');
console.log("merge sort");
var begin = new Date().getTime();
console.log(mergeSort(_data).join());
for(var i=0;i<1000000;i++) mergeSort(_data);
console.log("cost:" + (new Date().getTime() - begin).toString());

process.stdout.write('\n');
console.log("quick sort");
var begin = new Date().getTime();
console.log(quickSort(_data).join());
for(var i=0;i<1000000;i++) quickSort(_data);
console.log("cost:" + (new Date().getTime() - begin).toString());

process.stdout.write('\n');
console.log("bucket sort");
var begin = new Date().getTime();
console.log(bucketSort(_data).join());
for(var i=0;i<1000000;i++) bucketSort(_data);
console.log("cost:" + (new Date().getTime() - begin).toString());
