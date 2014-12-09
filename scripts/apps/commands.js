//Default commands that are registered
term.commands.register ( 'man', function( ){
  this.on_command = function( p ){
    var output = '';
    var commands = term.commands.get_commands_keys( );
    for ( i in commands ){
      output += commands[ i ]+'<br>';
    }
    return output;
  };
} );

term.commands.register ( 'print', function( ){
  this.on_command = function( p ){
    return p.slice( 1, p.length+1 ).toString( ).replace( ', ', ' ' );
  };
} );

term.commands.register ( 'load', function( ){
  this.on_command = function( p ){
    var url = p[1];
    var put = p[2];
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

term.commands.register ( 'hello', function( ){
  var personal = {};
  var test;
  d3.text( 'data/text.csv', function( data ){
    test = data;
  } );
  this.on_command = function( p ){
    return term.helpers.pretty( test );
    return term.helpers.pretty( "Hey, I am a javascript linux terminal emulator. You can type man to see the manuals that can help you find your way around. What name would you like to give me?" );
  };
  this.on_register = function( ){
    personal = {
      username : localStorage.getItem( "username" ),
      termname : localStorage.getItem( "termname" )
    };
  };
} );

term.commands.register ( 'column', function(){
  this.on_commands = function( pipein ){
    if ( typeof(pipein) == 'object' )
    return term.helpers.column(pipein);
  };
} );

term.commands.register ( 'backgrnd', function( ){
  var list = {};
  this.on_command = function( p ){
    console.log( p[ 1 ] );
    if ( p[ 1 ] == 'list' ){
      console.log( list );
      return term.helpers.column(list);
    }
    localStorage.setItem( "backgrnd", p[ 1 ] );
    term.elem.style.backgroundImage="url( styles/images/" + p[ 1 ];
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

term.commands.register ( 'date', function( ){
  this.on_command = function( p ){
    return Date( ).toString( );
  };
} );

term.commands.register ( 'clear', function( ){
  this.on_command = function( p ){
    term.output.innerHTML = '';
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

