term.settings = {
  autocomplete : true
};

term.commands.register( 'settings', function( settings ){ //TODO makeseperate module. (file)
  var settings = {};
  this.on_command = function( p ){
    var commands = {
      list : function(){
        return settings;
      }
    };
  };
} , term.settings);
