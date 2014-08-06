// g()()()()('al') → "gooooal"
function g(tail, head){
  head = head || 'g';
  return tail ? head + tail : function(t){
    return g(t, head+'o');
  };
}
console.log(g('al'));
console.log(g()('al'));
console.log(g()()('al'));
console.log(g()()()('al'));
console.log(g()()()()('al'));
console.log(g()()()()()('al'));
