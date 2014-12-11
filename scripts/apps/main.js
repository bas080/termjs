//----------
//FRAMEWORK-
//---------------------------------
//setup initial data and functions-
//---------------------------------
/*TODOS
  Pipes that take in input and put out output to other pipes.
  It will have a data system and not a file system using ls, cd, mv, rm etc
  Loading data within the terminal with curl and set save position
  Saving the data tree by allowing copy pasting of it ( JSON format ) aka text field copy paste
*/

term = {
  elem : document.getElementById( "terminal" )
};

term.helpers = new ( function Helpers( ){
  this.pretty = function( string ){
    var line_length = 64;
    var new_string = '';
    for ( var i = 0, l = string.length; i < l; i += line_length ) {
      var v = string[ i ];
      new_string += string.slice( i, i+line_length )+'<br>';
    }
    return new_string;
  };
  this.string = function( array ){
    return array.slice( 0, array.length ).toString( ).replace( /, /g, ' ' );
  };
  this.list = function( array ){
    var output = '';
    for ( i in array ){
      output += array[ i ]+'<br>';
    }
    return output;
  };
  this.column = function( array ){
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
    for ( i in array ){ //get the broadest string so we know how wide the collumns should be
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
        output += '</br>';
        }else
        column += 1;
      }else{
        return output;
      }
    }
  };
} )( );

term.input = new ( function Input( ){
  var before = document.getElementById( 'input_before' );
  var after  = document.getElementById( 'input_after' );
  var cursor = document.getElementById( 'input_cursor' );
  var blink = setInterval( function( ){
    if ( cursor.className == 'blink' )
    cursor.className = '';
    else
    cursor.className = 'blink';
  }, 3000 );
  this.backspace = function( word ){
    if ( word == true ){
      var text  = before.innerHTML.trim( );
      var words = text.split( ' ' );
      before.innerHTML = words.slice( 0, words.length-1 );
    }else{
      before.innerHTML = before.innerHTML.slice( 0, before.innerHTML.length-1 );
    }
  };
  this.add_character = function( character ){
    before.innerHTML += character;
  };
  this.set = function( string, add, cursor_pos ){
  };
  this.reset = function( ){
    before.innerHTML = '';
    after.innerHTML = '';
    cursor.innerHTML = ' ';
  };
  this.value = function( value ){
    if ( value )
    before.innerHTML = value;
    else
    return before.innerHTML+cursor.innerHTML+after.innerHTML;
  };
} )( );

term.output = new ( function Output( ){
  var output = document.getElementById( "output" );
  var log = [ ];
  this.add = function( string, add ){
    log.push( string );
    var newItem = document.createElement( "div" );
    var textnode = document.createTextNode( string );
    newItem.innerHTML = string;
    //newItem.appendChild( textnode );
    output.appendChild( newItem );
  };
  this.get = function( ){
    return log;
    //TODO push output history to list and this function can return all of one of certain index
  };
  this.clear = function( ){
    output.innerHTML = '';
  };
} )( );

term.history = new ( function History( input ){
  var list = [ ];
  var index = 0;
  this.add = function( string ) {
    list.push( string );
  };
  this.get = function( increment ){
    if ( index+increment == 0 )
    input.reset( );
    var item = list[ list.length+index+increment ];
    if ( item ){
      index += increment;
      input.value( item );
    }
  };
} )( term.input );

term.keyboard = new ( function Keyboard( input ){
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
        input.add_character( event.key ); //type the text to input line
      }
      event.preventDefault( ); //prevent browser defaults
    }
  } );
} )( term.input );

term.autocompleter = new ( function Autocomplete( input ){
  var tree = [ ];
  this.tree = tree;
  this.complete = function( string ){
    var string = string.trim( );
    var substr = [ ];
    var params = string.split( ' ' );
    for ( i in tree ){
      substr.push( tree[ i ].slice( 0, string.length ) );
    }
    var index = substr.indexOf( string );
    if ( index != -1 )
    input.value( tree[ index ]+' ' );
  };
  this.register = function( key, array ){
    if ( typeof( array ) == undefined )
    tree[ key ] = array;
    else
    tree.push( key );
  };
} )( term.input );

term.commands = new ( function Commands( autocompleter, history, output, input ){
  var commands = {};
  this.register = function( name, constructor ){
    commands[ name ] = new constructor;
    if ( commands[ name ].on_register ) //run the on_register command if command has this definition
    commands[ name ].on_register( );
    autocompleter.register( name );
  };
  this.get_commands_keys = function( ){
    var keys = [ ];
    for ( var k in commands ) keys.push( k );
    return keys;
  };
  this.execute = function( string ){
    if ( string.trim( ) == '' )
    return;
    history.add( string );
    output.add( string );
    input.reset( );
    var pipes = string.split( '|' );
    for ( i in pipes ){
      var coms = pipes[ i ].trim( );
      var params = coms.split( ' ' );
      var command = commands[ params[ 0 ] ];
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
      output.add( out );
    }
  };
} )( term.autocompleter, term.history, term.output, term.input );
