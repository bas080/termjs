//Default commands that are registered
term.commands.register ( 'man', function( ){
  this.on_command = function( p ){
    var commands = term.commands.get_commands_keys( );
    return term.helpers.column( commands );
  };
} );

term.commands.register ( 'print', function( ){
  this.on_command = function( p ){
    return term.helpers.string( p.slice( 1, p.length+1 ).toString( ).replace( ', ', ' ' ) );
  };
} );

term.commands.register ( 'load', function( ){
  this.on_command = function( p ){
    var url = p[ 1 ];
    var put = p[ 2 ];
    return 'succesfully added';
  };
} );

term.commands.register ( 'plot', function( ){
  this.on_command = function( p ){
    if ( p[ 1 ] == 'bar' ){ //plot a bar chart
      var uri = p[ 2 ];
      console.log( uri );
      d3[ 'tsv' ]( uri, function( data ){
        console.log( data );
        return data
      } );
    }
  };
} );

term.commands.register ( 'column', function( ){
  this.on_commands = function( params, input ){
    if ( typeof( input ) == 'object' )
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
      return term.helpers.column( list );
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
    var qry = p.slice( 1, p.length ).toString( ).replace( /, /g, '+' );
    var url = bse+qry;
    window.open( url );
  };
} );

term.commands.register ( 'youtube', function( ){ //TODO
  this.options = [
    'search',
    'pause',
    'play',
    'volume',
    'seek'
  ];
  this.on_command = function( p, input ){
    var commands = {
      search : function( p ){
        console.log( 'searching '+p );
      },
      pause : function( ){

      },
      play : function( ) {

      },
      volume : function( ) {

      },
      seek : function( ) {

      }
    };
    commands[ p[ 1 ] ]( p );
  };
} );

term.commands.register ( 'history', function( ){
  this.on_command = function( p, input ){
    return term.helpers.column( term.output.get( ) );
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

