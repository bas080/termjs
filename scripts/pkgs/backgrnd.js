term.package.register('backgrnd',{
  name : 'backgrnd',
  version: '0.1',
  version_name: 'drop'
});

term.command.register( 'backgrnd', function( ){
  var list = {};
  var options = [
    'list',
    'set'
  ];
  this.on_complete = function( p, c, a ){
    if ( p[0] == 'set' )
    return list;
    return options;
  };
  this.on_command = function( p ){
    if ( p[ 1 ] == 'list' ){
      return list;
    }else if ( p[ 1 ] == 'set' ){
      term.elem.style.backgroundImage="url( styles/images/" + p[ 2 ];
      localStorage.setItem( "backgrnd", p[ 2 ] );
    }
  };
  this.on_register = function( ){
    //Load available backgrnd.json
    qwest.get('data/backdrops.json')
     .then(function(response){
        alert(response);
     });
    //Set to previous background
    term.elem.style.backgroundImage="url( styles/images/" + localStorage.getItem( "backgrnd" );
  };
} );

