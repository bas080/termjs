term.commands.register ( 'plot', function( ){
  var element = document.createElement('div');
  this.on_register = function( p ){
    element.id = 'chart';
    document.getElementsByTagName('body')[0].appendChild(element);
  };
  this.on_command = function( p ){
    var commands = {
      clear : function(){
        element.innerHTML = '';
        return 'clear the plot';
      },
      plot : {
        bar : function(){
        },
        scatter : function(){
        },
      },
    };
    return commands[p[1]](p);
  };
  this.on_complete = function(p){
    return [];
  };
} );
