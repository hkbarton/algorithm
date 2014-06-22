var _data = [99,5,2,1,31,15,25,12,35,33,56,78,21,34,30,55];

/* ---Bubble Sort---*/
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

/* ---Insertion Sort, efficent for small array---*/
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

/* ---Merge Sort---*/
function _merge(a, start, middle, end, store){
  var ia = start;
  var ib = middle;
  for(var i=start;i<end;i++){
    if ((ia<middle && ib<end && a[ia]<a[ib]) || (ia<middle && ib>=end)){
      store[i] = a[ia];
      ia++;
    }else{
      store[i] = a[ib];
      ib++;
    }
  }
}

function _splitmerge(a, start, end, store){
  if (end - start < 2) return;
  var middle = Math.floor((start + end) / 2);
  _splitmerge(a, start, middle, store);
  _splitmerge(a, middle, end, store);
  _merge(a, start, middle, end, store);
  // copy back
  for(var i=start;i<end;i++){
    a[i] = store[i];
  }
}

function mergeSortTopDown(input){
  // recusion version of merge sort (top-down)
  // although in theory, merge sort is O(logn) algorithm
  // but function recusion in js will cost too much other spending
  // try bottom-up non recusion version
  input = input.slice(0);
  var store = new Array(input.length);
  _splitmerge(input, 0, input.length, store);
  return input;
}

function mergeSortBottomUp(input){
  input = input.slice(0);
  var bak = new Array(input.length);
  var n = input.length;
  var handle = input;
  var store = bak;
  for (var width=1; width<n; width=2*width){
    for (var i=0; i<n; i=i+2*width){
      _merge(handle, i, Math.min(i+width,n), Math.min(i+2*width,n), store);
    }
    // swith for next run
    if (handle===input) handle = bak; else if (handle===bak) handle = input;
    if (store===input) store = bak; else if (store===bak) store = input;
  }
  return input;
}

/* ---Quick Sort, Simple version: pivot not the median value, don't consider equal pivot condition---*/
function _qsort(a, left, right){
  if (left < right){
    var pivotIndex = _partition(a, left, right);
    _qsort(a, left, pivotIndex - 1);
    _qsort(a, pivotIndex + 1, right);
  }
}

function _partition(a, left, right){
  var pivotIndex = right; // not optimize for pivot selection
  var k = left;
  var tmp;
  for (var i=left;i<=right-1;i++){
    if (a[i]<=a[pivotIndex]){
      tmp = a[i];
      a[i] = a[k];
      a[k] = tmp;
      k++;
    }
  }
  tmp = a[k];
  a[k] = a[pivotIndex];
  a[pivotIndex] = tmp;
  return k;
}

function quickSort(input){
  input = input.slice(0);
  _qsort(input, 0, input.length-1);
  return input;
}

/* ---Bucket Sort---*/
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
console.log(mergeSortBottomUp(_data).join());
for(var i=0;i<1000000;i++) mergeSortBottomUp(_data);
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
