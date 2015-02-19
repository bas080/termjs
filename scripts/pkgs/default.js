//PACKAGE
term.package.register( 'default',{  //name of the package. Consider this the identifier
  version:      0.4,                //important for checking if user hase latest version.
  version_name: 'tupac'             //cause I can
});

//COMMANDS
term.command.register( 'package', function(){
  //use-strict
  var url = 'scripts/pkgs/repo.json';
  var self = this;
  this.repository = {};
  var get_repository = ( function( self ){
    var repo = function(){
      qwest.get( url ).then( function( data ){
        self.repository = (data);
      });
    };
    repo();
    return repo;
  })(this);
  var commands = {
    update  : function(){
      get_repository();
    },
    install : function( p ){
      var name = p[2];
      term.package.load( name );
    },
    list : function( p ){
      return term.package.where([]);
    },
//    upgrade
//    install
//    remove
  };
  this.on_command = function( p ){
    if ( commands[p[1]] !== undefined )
      commands[p[1]]( p );
    else{
      return this.manual;
    };
  };
  this.on_complete = function(p){
    if ( p[2] !== undefined ){
      return self.repository.packages;
    }
    if ( p[1] !== undefined )
    return term.helper.keys( commands );
  };
  this.manual = 'you can do it';
});

term.command.register( "keys", function(){
  this.on_command = function( p, input ){
    return term.helper.keys(input);
  };
});

term.command.register( 'commands', function( ){
  this.on_command = function( p ){
    return term.command.where([]);
  };
});

term.command.register( 'manual', function(){
  this.on_command = function( p, i ){
    try {
      return term.command.get(p[1]).manual;
    } catch (e) {
      return 'has no manual';
    }
  };
  this.on_complete = function( p ){
    return term.command.where([]);
  };
});

term.command.register( 'source', function(){
  this.on_command = function( p, i ){
    var command = term.command.get(p[1]);
    return command.on_command.toString();
  };
  this.on_complete = function( p ){
    return term.command.where([]);
  }
  this.manual = "see the source code of a command it's on_command function";
});

term.command.register( 'echo', function(){
  this.on_command = function(p){
    return p.slice( 1 ).join(' ');
  };
});

term.command.register( 'open', function(){
  var history = [];
  var iframe_elem;
  var commands = {
    history : function(){
      return history;
    },
    hide : function(){
      iframe_elem.toggleClass('hide');
    }
  };
  this.on_command = function( p ){
    for ( i in p.slice(1) ){
      history.push(p[i]);
      var url = 'http://'+p[i];
      window.open( url );
    }
  };
  this.on_complete = function( p ){ //returns a array of possible completions
    return history;
  };
} );

term.command.register( 'list', function( ){
  this.on_command = function( params, input ){
    var output = '';
    for ( i in input ){
      output += input[i]+'\n';
    }
    return output;
  };
} );

term.command.register( 'column', function( ){
  this.on_command = function( p, array ){
    var widest = 0;
    var amount = array.length;
    var width  = 70;
    var padding = 2;
    var spaces = function( amount ){
      var output = '';
      for ( var i = 0, l = amount; i < l; i ++ ) {
        output += ' ';
      }
      return output;
    };
    for ( i in array ){
      widest = Math.max( array[ i ].toString( ).length, widest );
    }
    var columns = Math.floor( width/( widest+padding ) );
    var output = '';
    var column = 0;
    var index = 0;
    while ( true ){
      if ( array[ index ] ){
        output += array[ index ]+spaces( widest-array[ index ].toString( ).length+padding );
        index += 1;
        if ( column >= columns ){
        column = 0;
        output += '\n';
        }else
        column += 1;
      }else{
        return output;
      }
    }
  };
} );

term.command.register( 'string', function( ){
  this.on_command = function( p, input ){
    var string = '';
    for ( i in input )
    string += input[i]+' ';
    return string;
  };
});

term.command.register( 'history', function( ){
  this.on_command = function( p, input ){
    return term.input.history.get();
  };
} );

term.command.register( 'date', function( ){
  this.on_command = function( p ){
    return Date( ).toString( );
  };
  this.on_complete = function( p, i ){
    return ['human', 'unix', 'utf' ];
  };
} );

term.command.register( 'clear', function( ){
  this.on_command = function( p ){
    term.screen.pre_commandline.clear();
  };
} );

term.command.register( 'refresh', function( ){
  this.on_command = function( p ){
    window.location.reload( );
  };
  this.on_register = function( p ){
  };
} );

//SHORTCUTS
term.shortcut.register( 'Ctrl r', function( ){
  window.location.reload( );
} );

term.shortcut.register( 'Ctrl l', function( ){
  term.screen.clear( 'pre_commandline' );
} );

term.shortcut.register( 'Ctrl c', function( ){
  term.screen.commandline.text('');
} );

term.shortcut.register( 'Alt Backspace', function( event ){
  var string = term.screen.pre_cursor.text();
  till = string.replace(/\S*\s*$/g,'')
  var steps = string.length-till.length;
  return term.screen.cursor.remove( -steps );
} );

term.shortcut.register( 'Backspace', function( event ){
  return term.screen.cursor.remove( -1 );
} );

term.shortcut.register( 'Del', function( event ){
  return term.screen.cursor.remove( 1 );
} );

term.shortcut.register( 'Enter', function( ){
  return interpretation = term.interpret( term.screen.commandline.text() );
} );

term.shortcut.register( 'Ctrl Left', function( event ){
  var string = term.screen.pre_cursor.text();
  var to = string.replace(/\S*\s*$/g,'')
  var steps = string.length-to.length;
  return term.screen.cursor.move(-steps);
} );

term.shortcut.register( 'Ctrl Right', function( event ){
  var string = term.screen.pos_cursor.text();
  var steps = string.search(/\s\S/g);
  if ( steps == -1 )
  steps = string.length;
  return term.screen.cursor.move( steps+1 );
} );

term.shortcut.register( 'Left', function( event ){
  return term.screen.cursor.move( -1 );
} );

term.shortcut.register( 'Right', function( event ){
  return term.screen.cursor.move( 1 );
} );

term.shortcut.register( 'Tab', function( ){
  return term.complete();
} );
