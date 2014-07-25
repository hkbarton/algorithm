// use array to represent a linked list, every elements in array should be different
// for example given 1 2 3 4 5 6, represent a linked list: 1->2->3->4->5->6
// if gaven 1 2 3 4 5 3, show this linked list have a cycle.
exports.buildLinkedListFromArray = function(data){
  var result = {};
  var handle = result;
  var i = 0;
  while(i<data.length){
    handle.key = data[i];
    if (data.indexOf(data[i]) < i){
      var tmp = result;
      while(tmp!==null && tmp.key!=data[i]) tmp = tmp.next; 
      handle.next = tmp;
      break;
    }else{
      handle.next = i==data.length-1 ? null : {};
      handle = handle.next;
    }
    i++;
  }
  return result;
};
