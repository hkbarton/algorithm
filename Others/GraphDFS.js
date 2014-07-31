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
    var job = [];
    console.log('DFS parents:');
    console.log(DFS(graph, job));
    console.log('Job Schedule: ' + job.reverse().join(','));
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

function DFS_visit(s, graph, p, job){
  for(var i=0;i<graph[s].length;i++){
    var v = graph[s][i];
    if (typeof p[v] != 'string'){
      p[v] = s;
      DFS_visit(v, graph, p, job);
      job.push(v);
    }
  }
}

function DFS(graph, job){
  var p = {};
  for(var s in graph){
    if (typeof p[s] != 'string'){
      p[s] = null;
      DFS_visit(s, graph, p, job);
      job.push(s);
    }
  }
  return p;
}

