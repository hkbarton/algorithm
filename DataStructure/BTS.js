(function main(){
  var sInput = "";
  process.stdin.resume();
  process.stdin.setEncoding("ascii");
  process.stdin.on("data", function(input){
    sInput += input;
  });
  process.stdin.on("end", function(){
    processInput(sInput); 
    try{
    }catch(e){
      console.log(e);
      process.exit(1);
    }
  });
})();

function processInput(input){
  if (typeof input == "string"){
    var lines = input.replace(/^\s+|\s+$/g,"").split("\n");
    var tree = new Tree();
    var commands = [];
    for (var i=0;i<lines.length;i++){
      commands = lines[i].match(/^(add|del|print)(\s(\d+))?$/);
      if (commands!==null){
        switch(commands[1]){
          case "add":
            insert(tree, parseInt(commands[3]));
            break;
          case "del":
            del(tree, parseInt(commands[3]));
            break;
          case "print":
            console.log("--------------------------------");
            printTree(tree);
            break;
        }
      }
    }
  }else{
    throw "Data input should be string.";
  }
}

function Tree(key){
  if (this instanceof Tree){
    if (Object.keys(arguments).length>0){
      this.key = key;
    }else{
      this.key = null;
    }
  }
}

function insert(tree, key, parentNode){
  if (tree.key===null){ // null key means init node
    tree.key = key;
    //tree.parentNode = parentNode;
  }else if(key < tree.key){
    if (!tree.leftTree){
      tree.leftTree = new Tree();
    }
    insert(tree.leftTree, key, tree);  
  }else if(key >= tree.key){
    if (!tree.rightTree){
      tree.rightTree = new Tree();
    }
    insert(tree.rightTree, key, tree);
  }
}

function search(tree, key){
  if (tree.key==key){
    return tree;
  }else if (key < tree.key){
    return search(tree.leftTree, key);
  }else if (key >= tree.key){
    return search(tree.rightTree, key);
  }
}

function del(tree, key){
  var node = search(tree, key);
  if (node){
    if (!node.leftTree && !node.rightTree){
      if(node.parentNode.leftTree===node){
        node.parentNode.leftTree = null;
      }else if(node.parentNode.rightTree===node){
        node.parentNode.rightTree = null;
      }
      node.parentNode = null;
    }else if(node.leftTree && !node.rightTree){
      node.key = node.leftTree.key;
      node.leftTree = null;
    }else if (!node.leftTree && node.rightTree){
      node.key = node.rightTree.key;
      node.rightTree = null;
    }else{
      // TODO 
    }
  }
}

function printTree(tree){
  // print tree use breadth-first algorithm
  if (tree){
    var temp = [];
    temp.push({data:tree, level:0});
    var node = null;
    var level = 0;
    while(temp.length>0){
      node = temp.shift();
      if (node.level!=level){
        process.stdout.write("\n");
        level = node.level;
      }
      process.stdout.write(node.data.key + "  ");
      if (node.data.leftTree){
        temp.push({data:node.data.leftTree, level:(node.level + 1)});
      }
      if (node.data.rightTree){
        temp.push({data:node.data.rightTree, level:(node.level + 1)});
      }
    }
    process.stdout.write("\n");
  }
}
