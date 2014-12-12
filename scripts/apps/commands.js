//Default commands that are registered
term.commands.register ( 'man', function( ){
  this.on_command = function( p ){
    var commands = term.commands.get_commands_keys( );
    return commands;
  };
} );

term.commands.register ( 'load', function( ){
  this.on_command = function( p ){
    var url = p[ 1 ];
    var put = p[ 2 ];
    return 'succesfully added';
  };
} );

term.commands.register ( 'list', function( ){
  this.on_command = function( params, input ){
    return term.helpers.list( input );
  };
} );

term.commands.register ( 'column', function( ){
  this.on_command = function( params, input ){
    console.log(input);
    return term.helpers.column( input );
  };
} );

term.commands.register ( 'backgrnd', function( ){
  var list = {};
  this.options = [
    'list',
    'set'
 ];
  this.on_command = function( p ){
    console.log( p[ 1 ] );
    if ( p[ 1 ] == 'list' ){
      return list;
    }else if ( p[ 1 ] == 'set' ){
      term.elem.style.backgroundImage="url( styles/images/" + p[ 2 ];
      localStorage.setItem( "backgrnd", p[ 2 ] );
    }
  };
  this.on_register = function( ){
    //Load available backgrnd.json
    d3.json( "data/backdrops.json", function( data ) {
      list = data.backdrops;
    } );
    //Set to previous background
    term.elem.style.backgroundImage="url( styles/images/" + localStorage.getItem( "backgrnd" );
  };
} );

term.commands.register ( 'google', function( ){
  this.on_command = function( p, input ){
    var bse = 'https://www.google.es/search?q=';
    var qry = p.slice( 1, p.length ).toString( ).replace( /,/g, '+' );
    var url = bse+qry;
    window.open( url );
  };
} );

term.commands.register ( 'history', function( ){
  this.on_command = function( p, input ){
    return term.history.list( );
  };
} );

term.commands.register ( 'date', function( ){
  this.on_command = function( p ){
    return Date( ).toString( );
  };
} );

term.commands.register ( 'clear', function( ){
  this.on_command = function( p ){
    term.output.clear( );
  };
  this.on_register = function( p ){
  };
} );

term.commands.register( 'refresh', function( ){
  this.on_command = function( p ){
    window.location.reload( );
  };
  this.on_register = function( p ){
  };
} );

term.commands.register ( 'ls', function( ){
  this.on_command = function( args ){
  };
  this.on_load = function( args ){
  };
  this.on_register = function( args ){
  };
} );
