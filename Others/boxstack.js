/*
Box Towers

In the not so distant future, Box has commissioned you to design the new Box Worldwide Headquarters - The Box Towers. The design principal is a series of boxes (what else?),  one on top of each other. Each department in Box will be located in a different box.

Now each department has decided they have different needs in terms of the height, width and length (depth) of their box. For structural integrity reasons, you must also not place a box that has a larger footprint on top of a box with a smaller footprint i.e a box can be kept on the top of another box only if the Length of the upper box is not more than the Length of box below and the same for Width. You may rotate the boxes as necessary to make any of the face as base i.e 3D rotation is allowed.

Given the set of boxes, come up with the tallest building possible while satisfying the above constraints. It may not be possible to use all the boxes.

Input Format:

1st line contains the number of boxes , N.

Then follow N lines describing the configuration of each of the N boxes. Each of these lines contain three integers (length, width and height of the box)

Output Format:

Output a single line which is the height of the tallest possible building that can be formed with some of the boxes given and satisfying the constraints.

Sample Input

 

3
5 2 4
1 4 2
4 4 2

 

Sample Output

13

Explanation

Place box 2 on top below which is box 1 and the bottom-most box is box 3. Box 2 is placed with base ( 1 2 ) and height 4 , box 1 is placed with base ( 2 4 ) and height 5, and box 3 is placed with base ( 2 4 ) and height 4. So total height of this tower is 13.

Constraints:

N, the number of boxes is not more than 20

For any box , 1 <= Length,Width,Height <= 100
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
    var v1, v2, v3;
    for (var i=1;i<=acceptCnt;i++){
      item = lines[i].replace(/^\s+|\s+$/g,"").split(/\s+/);
      if (item.length!=3){
        throw "Input line " + i + " have invalidate data.";
      }
      v1 = parseInt(item[0]);
      v2 = parseInt(item[1]);
      v3 = parseInt(item[2]);
      if (isNaN(v1) || isNaN(v2) || isNaN(v3)){
        throw "Input line " + i + " have invalidate data, should include 3 numbers.";
      }
      if (v1>=1 && v1<=100 && v2>=1 && v2<=100 && v3>=1 && v3<=100){
        // push data format: [box_id, width, length, height]
        data.push([i-1, Math.min(v1,v2), Math.max(v1,v2), v3]);
        data.push([i-1, Math.min(v1,v3), Math.max(v1,v3), v2]);
        data.push([i-1, Math.min(v2,v3), Math.max(v2,v3), v1]);
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
  // sort by base area
  data.sort(function(a, b){
    return b[1]*b[2] - a[1]*a[2];
  });
  // solve problem using DP
  // h(i) = height of box i
  // result(i) = max height if putting box i on the top
  // result(i) = max(result(j)) + h(i); j<i && data[j][1] >= data[i][1] && data[j][2] >= data[i][2]
  // start DP using bottom-up, no recursion
  var result = Array(data.length);
  var usedBox = Array(data.length);
  var usedBoxIndex = Array(data.length);
  var max = 0;
  var maxidx = 0;
  var i = 0;
  for (i=0;i<data.length;i++){
    max = 0;
    maxidx = 0;
    usedBox[i] = [];
    usedBoxIndex[i] = [];
    for (var j=0;j<i && 
      (data[j][1]>=data[i][1] && data[j][2]>=data[i][2]);
      j++){
      if (result[j] > max){
        max = result[j];
        maxidx = j;
      }
    }
    usedBox[i] = usedBox[maxidx].concat([data[i][0]]);
    usedBoxIndex[i] = usedBoxIndex[maxidx].concat([i]);
    result[i] = max + data[i][3];
  }
  max = 0;
  maxidx = 0;
  for (i=0;i<data.length;i++){
    if (result[i]>max){
      max = result[i];
      maxidx = i;
    }
  }
  // recaulate for remove duplicate box
  max = 0;
  var boxMax = Array(data.length/3);
  var boxIndex = 0;
  var dataIndex = 0;
  for (i=0;i<usedBox[maxidx].length;i++){
    boxIndex = usedBox[maxidx][i];
    dataIndex = usedBoxIndex[maxidx][i]; 
    if (boxMax[boxIndex]===undefined) boxMax[boxIndex] = 0;
    if (boxMax[boxIndex] < data[dataIndex][3]){
      boxMax[boxIndex] = data[dataIndex][3];
    }
  }
  max = 0;
  for(i=0;i<boxMax.length;i++){
    max += boxMax[i];
  }
  console.log(max);
}
