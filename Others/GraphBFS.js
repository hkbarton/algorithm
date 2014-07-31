(function main(){
  console.log("Input Adjacency List, e.g: ");
  console.log("a c: a->c");
  console.log("b a c: b->a->c");
  console.log("c b: c->b");
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
    var graph = buildGraph(lines);
    console.log('Graph:');
    console.log(graph);
    var firstKey, lastKey;
    for(firstKey in graph) break;
    for(lastKey in graph);
    console.log(firstKey);
    console.log(lastKey);
    var result = BFS(firstKey, graph);
    var parent = result[0];
    var level = result[1];
    console.log(level);
    console.log('Shortest path from ' + firstKey + ' to ' + lastKey + ' is:');
    var shortPath = [lastKey];
    var p = parent[lastKey];
    shortPath.push(p);
    while(p!=firstKey){
      p = parent[p];
      shortPath.push(p);
    }
    console.log(shortPath.reverse());
  }else{
    throw "Data input should be string.";
  }
}

function buildGraph(data){
  var result = {};
  var adj;
  for (var i=0;i<data.length;i++){
    adj = data[i].trim().split(/\s+/);
    result[adj[0]] = [];
    for (var j=1;j<adj.length;j++){
      result[adj[0]].push(adj[j]);
    }
  }
  return result;
}

function BFS(s, graph){
  var parent = {};
  var level = {};
  level[s] = 0;
  parent[s] = null;
  var i = 1;
  var front = [s];
  var next = [];
  while(front.length > 0){
    next = [];
    for (var j=0;j<front.length;j++){
      var u = front[j];
      for (var k=0;k<graph[u].length;k++){
        var v = graph[u][k];
        if (typeof level[v] != 'number'){
          level[v] = i;
          parent[v] = u;
          next.push(v);
        }
      }
    }
    front = next.slice();
    i++;
  }
  return [parent, level];
}
