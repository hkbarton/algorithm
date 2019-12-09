// Implement regular expression matching with support for '.' and '*'.
// The matching should cover the entire input string (not partial).

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
    console.log(isMatch(lines[0].trim(), lines[1].trim()));
  }else{
    throw "Data input should be string.";
  }
}

function _match(p, s, ppos, spos){
  if (ppos >= p.length){
    return spos==s.length; 
  }
  if (p[ppos+1]=='*'){
    while((spos<s.length && p[ppos]==s[spos]) || (p[ppos]=='.' && spos<s.length)){
      if(_match(p, s, ppos+2, spos)){
        return true;
      }
      spos++;
    }
    return _match(p, s, ppos + 2, spos); // match the rest string
  }else{
    if ((spos<s.length && p[ppos]==s[spos]) || (p[ppos]=='.' && spos<s.length)){
      return _match(p, s, ppos+1, spos+1);
    }else{
      return false; 
    }
  }
}

function isMatch(pattern, s){
  return _match(pattern, s, 0, 0);
}
