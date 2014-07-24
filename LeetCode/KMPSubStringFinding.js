// Implement strStr().
// Returns a pointer to the first occurrence of needle in haystack, or null if needle is not part of haystack.
// use KMP algorithm, http://en.wikipedia.org/wiki/Knuth%E2%80%93Morris%E2%80%93Pratt_algorithm

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
    if (lines.length < 2){
      throw "Must input two string.";
    }
    console.log(indexOf(lines[0], lines[1]));    
  }else{
    throw "Data input should be string.";
  }
}

function buildingFallbackTable(w){
  var result = Array(w.length);
  result[0] = -1;
  result[1] = 0;
  var pos = 2;
  var idx = 0;
  while(pos < w.length){
    if (w[pos-1]==w[idx]){
      idx++;
      result[pos++] = idx;
    }else if (idx > 0){
      idx = result[idx];
    }else{
      result[pos++] = 0;
    }
  }
  return result;
}

function indexOf(s, w){
  if (w.length > s.length){
    return -1;
  }
  var m = 0;
  var i = 0;
  var fallbackTable = buildingFallbackTable(w);
  while(m < s.length){
    if (s[m + i]==w[i]){
      if (i==w.length-1){
        return m;
      }
      i++;
    }else{
      if (fallbackTable[i] > -1){
        i = fallbackTable[i];
        m = m + i - fallbackTable[i];
      }else{
        i = 0;
        m++;
      }
    }
  }
  return -1;
}
