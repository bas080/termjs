term.command.register('grep', function(){
  this.on_command = function( p, i ){
    var reg = new RegExp(p[1], p[2]);
    return i.match(reg);
  };
});
