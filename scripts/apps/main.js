//----------
//FRAMEWORK-
//---------------------------------
//setup initial data and functions-
//---------------------------------
/*TODOS
  jQuery like onready event for term
  Pipes that take in input and put out output to other pipes.
  It will have a data system and not a file system using ls, cd, mv, rm etc
  Loading data within the terminal with curl and set save position
  Saving the data tree by allowing copy pasting of it (JSON format)
*/

term = {
};

term.ready = function( func ) {
  func( );//wait till everything is loaded and then do the other things importent for certain modules to load first after others
};

term.ready( function( ){
  term.history =  [ ],
  term.input   = document.getElementById( "input" );
  term.output  = document.getElementById( "output" );
  term.elem    = document.getElementById( "terminal" );
} );

term.commands = new (function Commands( ){
  var commands = {};
  this.register = function( name, constructor ){
    commands[ name ] = new constructor;
    if ( commands[ name ].on_register ) //run the on_register command if command has this definition
    commands[ name ].on_register( );
    term.autocomplete.register( name );
  };
  this.get_command = function( name ){
    return commands[ name ];
  };
  this.get_commands = function( ){
    return commands;
  };
  this.get_commands_keys = function( ){
    var keys = [ ];
    for ( var k in commands ) keys.push( k );
    return keys;
  };
})();

term.autocomplete = new (function Autocomplete( ){
  var tree = [ ];
  this.tree = tree;
  this.complete = function( string ){
    var substr = [ ];
    var params = string.split( ' ' );
    for ( i in tree ){
      substr.push( tree[ i ].slice( 0, string.length ) );
    }
    var index = substr.indexOf( string );
    if ( index != -1 )
    term.input.innerHTML = tree[ index ]+' ';
  };
  var files = function( ){
    term.interface.pwd( );
  };
  this.register = function( key, array ){
    if ( typeof( array ) == undefined )
    tree[ key ] = array;
    else
    tree.push( key );
  };
})();

term.interface = new (function Interface( ){
  var Interface = this;
  var shortcuts = {};
  var history_index = 0;
  var cursor = document.getElementById( 'cursor' );
  var blink = setInterval( function( ){
    if ( cursor.className == 'blink' )
    cursor.className = '';
    else
    cursor.className = 'blink';
  }, 3000 );
  var log = function( string ){
    var newItem = document.createElement( "div" );
    var textnode = document.createTextNode( string );
    newItem.innerHTML = string;
    //newItem.appendChild( textnode );
    var list = term.output;
    list.appendChild( newItem );
  };
  this.history = function( jump ){
    if ( history_index+jump == 0 )
    Interface.reset( );
    var item = term.history[ term.history.length+history_index+jump ];
    console.log( item );
    if ( item ){
      history_index += jump;
      term.input.innerHTML = item;
    }
  };
  this.reset = function( ){
    history_index = 0;
    term.input.innerHTML = '';
  };
  this.execute = function( string ){
    term.history.push( string );
    log( string );
    term.input.innerHTML = '';
    var commands = string.split( '|' );
    for ( i in commands ){
      var coms = commands[ i ].trim( );
      var params = coms.split( ' ' );
      var command = term.commands.get_command( params[ 0 ] );
      if ( command ){
        var out = command.on_command( params );
      }else{
        try {
          var out = eval( string );
        } catch ( e ) {
          if ( e instanceof SyntaxError ) {
            out = e;
            console.log( e );
          }
        }
      }
      if ( out )
      log( out );
    }
  };
})();

term.keyboard = new (function Keyboard( ){
  var Keyboard = this;
  var shortcuts = {};
  this.shortcut = function( shortcut, func ){ //get or set a keyboard shortcut
    if ( typeof( func ) === 'undefined' ){
      return shortcuts[ shortcut ];
    }else{
      shortcuts[ shortcut ] = func;
      return func;
    }
  };
  var keyboard_combo = function( event ){ //get the keyboard combination that is pressed
    var key = event.key;
    var combo = '';
    if ( event.ctrlKey )
    combo += 'Ctrl ';
    if ( event.altKey )
    combo += 'Alt ';
    if ( event.shiftKey )
    combo += 'Shift ';
    combo += key
    return combo;
  };
  var is_browser_shortcut = function( event ){
    var shortcuts = [
      'F5',
      'Ctrl Tab',
      'Ctrl Shift Tab',
      'Ctrl t',
      'Ctrl 0',
      'Ctrl =',
      'Ctrl -'
    ];
    var key = event.key;
    return shortcuts.indexOf( key );
  };
  $( window ).keypress( function( event ){ //uses jquery because it recognises lower and uppercase chars
    var combo = keyboard_combo( event );
    console.log( combo );
    if ( is_browser_shortcut( combo ) == -1 ){
      if ( Keyboard.shortcut( combo ) ){ //check if keyboard shortcut exists
        shortcuts[ combo ]( event ); //execute the shortcut function
      }else if ( event.key.length == 1 ){
        term.input.innerHTML += event.key; //type the text to input line
      }
      event.preventDefault( ); //prevent browser defaults
    }
  } );
})();

term.helpers = new ( function( ){
  this.pretty = function( string ){
    var line_length = 64;
    var new_string = '';
    for ( var i = 0, l = string.length; i < l; i += line_length ) {
      var v = string[ i ];
      new_string += string.slice( i, i+line_length )+'<br>';
    }
    return new_string;
  };
  this.column = function( array ){
    var widest = 0;
    var amount = array.length;
    var width  = 70;
    var padding = 2;
    var spaces = function(amount){
      var output = '';
      for (var i = 0, l = amount; i < l; i ++) {
        output += ' ';
      }
      return output;
    };
    for ( i in array ){ //get the broadest string so we know how wide the collumns should be
      widest = Math.max(array[i].toString().length, widest);
    }
    console.log(widest);
    var columns = Math.floor(width/(widest+padding));
    console.log(columns);
    var output = '';
    var column = 0;
    var index = 0;
    while ( true ){
      console.log(array[index]);
      if ( array[index] ){
        output += array[index]+spaces(widest-array[index].toString().length+padding);
        index += 1;
        if ( column > columns){
        column = 0;
        output += '</br>';
        }else
        column += 1;
      }else{
        return output;
      }
    }
  };
} )( );
