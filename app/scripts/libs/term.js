
// a way to define multiple terminals

( function( global ){

  var term = global.term = {};

  'use strict';

  var container = 'term';
  var lines = document.createElement( "div" );
  var pre_cursor = document.createElement( "span" );
  var cursor = document.createElement( "span" );
  var post_cursor = document.createElement( "span" );

  cursor.className = 'cursor';
  cursor.innerHTML = ' ';
  lines.className = 'lines';

  var prompt = document.createElement( "div" );
  var terminal = document.getElementById( container );

  prompt.className = 'prompt';
  terminal.className = 'terminal'

  var completions = {};
  var commands    = {};
  var keybindings = {};

  term.completions = completions;
  term.keybindings = keybindings;
  term.commands    = commands;

  terminal.appendChild( prompt );
  prompt  .appendChild( pre_cursor );
  prompt  .appendChild( cursor );
  prompt  .appendChild( post_cursor );
  terminal.appendChild( lines );

  term.elements = {
    lines: lines,
    container: container,
    prompt: prompt,
    pre_cursor: pre_cursor,
    cursor: cursor,
    post_cursor, post_cursor,
    terminal: terminal,
  };

  /**
   * command to be performed when a key is pressed. This functon can also be
   * used to simulate as if a key was pressed in terminal.
   *
   * @param {string} keys_string - the key string that was pressed.
   * @param {event} event - the dom event object
   * @returns {*} returns either the string of the pre_cursor or the output of
   * one of the keybinding functions
   *
   */
  strokey.onKeyPress( function( keyString, event ){
    term.keyPress( keyString, event );
    event.preventDefault();
    return false;
  });

  term.keyPress = keyPress( pre_cursor, keybindings, isChar );
  function keyPress( pre_cursor, keybindings, isChar ){
    return function( keys_string, event ){
      if ( isChar( keys_string ) )
      return pre_cursor.innerHTML += keys_string;
      if ( keybindings[ keys_string ] )
      return keybindings[ keys_string ]( event );
    };
  }

  term.completion = completion;
  function completion( word, fn ){
    return completions[ word ] = fn;
  };

  /**
   * enables the registering of keybindings. An example of a keybinding would be
   * 'Ctrl c' to clear the prompt input area.
   *
   * @param {string} keys_string - the key combination string 
   * @param {function} fn the function to be called when the keybinding is triggered
   * @returns the return of the keybinding function
   *
   */
  term.keybinding = keybinding( keybindings );
  function keybinding( keybindings ){
    return function( keys_string, fn ){
      return keybindings[keys_string] = fn;
    };
  }

  /**
   * @returns {string} the the text that is on the prompt. This includes the pre_cursor
   * , cursor and post_cursor textContent
   *
   */
  term.promptString = promptString( prompt, elementText );
  function promptString( prompt, elementText ){
    return function( ){
      return elementText( prompt );
    };
  }

  term.preCursorString = preCursorString;
  function preCursorString( ){
    return pre_cursor.innerHTML;
  }

  /**
   * get the text of an element without the html symbols
   *
   * @param {selection} e - the element to get the text from
   *
   * @returns {string} the text withing the selection
   *
   */
  function elementText(el) {
    var sel, range, innerText = "";
    if (typeof document.selection != "undefined" && typeof document.body.createTextRange != "undefined") {
      range = document.body.createTextRange();
      range.moveToElementText(el);
      innerText = range.text;
    } else if (typeof window.getSelection != "undefined" && typeof document.createRange != "undefined") {
      sel = window.getSelection();
      sel.selectAllChildren(el);
      innerText = "" + sel;
      sel.removeAllRanges();
    }
    return innerText;
  }

  /**
   * moves the cursor to the given index on the prompt
   *
   * @param {int} index - the index to add or move to
   * @param {bool} relative - if true it adds the 'index' int to the current
   * cursor position
   *
   * @returns {string} the prompt string
   *
   */
  term.moveCursor = moveCursor( pre_cursor, cursor, post_cursor, term.promptString );
  function moveCursor( pre_cursor, cursor, post_cursor, promptString ){
    return function( index, relative ){
      if ( relative )
      var index = pre_cursor.innerHTML.length + index;
      var string = promptString();
      if (  index < 0 )
      index = 0;
      if ( index > string.length-1 )
      index = string.length - 1;
      cursor.innerHTML = string[ index ];
      pre_cursor.innerHTML = string.slice( 0, index );
      post_cursor.innerHTML = string.slice( index +1, string.length );
      return promptString();
    };
  }

  /**
   * add line to the terminal log. These are the lines above the prompt
   *
   */
  term.addLine = addLine( lines );
  function addLine( lines ){
    return function( elemFn ){
      var elem = document.createElement( 'div' )
      elemFn( elem );
      return lines.insertBefore( elem, lines.childNodes[0] );
    };
  }

  term.replaceLine = replaceLine;
  function replaceLine( overwritten, overwriter ){
    return overwritten.replaceChild( overwriter );
  }

  term.removeLine = removeLine( lines );
  function removeLine( lines ){
    return function( line ){
      return lines.removeChild( line );
    };
  }

  /**
   * parses a complete script. This can either be a piece of text with
   * linebreaks, or a line where the different commands are split using &&
   *
   * @param {string} line -
   *
   * @returns {object} an object that can be used to execute commands regisyered
   * or if not then eval-ed by javascript
   */
  term.parse = parse( getLines, getPipes, getWords );
  function parse( lines, pipes, words ){
    return function( string ) {
      return pipe(
        lines,
        map( pipes ),
        map( map( words ) )
      )( string );
    };
  }

  /**
   * splits lines using &&. These commands are performed sequentially. In future
   * it might also split on line break. Enabeling the possibility of writing
   * scripts
   *
   * @param {string} string - a string representing a script
   *
   * @returns {array}
   *
   */
  function getLines( string ){
    return string.split( '&amp;&amp;' ).map( trim );
  }

  /**
   * splits the line string into the pipes strings
   *
   * @returns {array} contains the commands that are seperated by pipes
   */
  function getPipes( string ){
    return string.split( '|' ).map( trim );
  }

  /**
   * splits a string up using the space. The first item in the array is the
   * commands, and the other items are the options passed to the command. Takes
   * into consideration single and double quotes and makes sure these are
   * considered a single argument.
   *
   * @param {string} string
   *
   * @returns {array}
   *
   */
  function getWords( string ){
    var is_quoted = false;
    return quoteSplit( string ).reduce( function( acc, string, index ){
      if ( isQuoted( index ) )
        return acc.concat( [ string ] );
      return acc.concat( string.split( ' ' ) ).map( trim );
    }, [] );

    function isQuoted( index ){
      return isOdd( index );
    }

    function quoteSplit( string ){
      return string.split( /"|'|`/g );
    }

  }

  /**
   * removes whitespaces and returns only the arguments and the commands name.
   * The command name being the first item in the array that is returned.
   *
   * @param {array} command - an array with command name argument and
   * whitespaces
   *
   * @returns {array}
   *
   */
  function getArguments( command ){
    return command.filter( existy );
  }

  /**
   * runs the parsed script(string). If no the the command is not registered the
   * javascript eval function is used instead.
   *
   * @param {array} commands - an array with arrays with arrays
   *
   * @returns {array} strings to be printed per line
   */
  term.run = run;
  function run( lines ){

    return runLines( lines );

    function runLines( lines ){
      return map( runPipes )( lines );
    }

    function runPipes( pipes ){
      return pipes.reduce( function( input, words ){
        return runCommand( words, input );
      }, undefined );
    }

    function runCommand( words, input ){
      var word = words[0];
      if ( isCommand( word ) )
        return commands[ word ]( words.slice( 1, words.length ), input );
      return evalString( words.join( ' ' ) );
    }

    function evalString( string ){
      var result;
      try {
        result = eval.call( window, string );
      } catch (e) {
        result =  e;
      }
      return result;
    };

    function isCommand( word ){
      return !!commands[ word ];
    }

  }

  term.test = test;
  function test( str ){
    var result =  term.run(
      term.parse( str )
    );
    term.addLine( function( elem ){
      return elem.innerHTML = result;
    });
  }

  term.command = command( commands );
  function command( commands ){
    return function( name, main_fun ){
      return commands[ name ] = main_fun;
    };
  }

  term.alias = alias( commands );
  function alias( commands ){
    return function( alias, command ){
      return commands[alias] = commands[command];
    };
  }

  term.write = write;
  function write( file, content ){
    return localStorage.setItem( file, JSON.stringify( content ) );
  }

  term.read = read;
  function read( file ){
    return JSON.parse( localStorage.getItem( file ));
  }

  term.remove = remove;
  function remove( file ){
    return delete localStorage[ file ];
  }

  term.files = files;
  function files( ){
    var res = [];
    for ( var i in localStorage ){
      if ( typeof( localStorage[i] ) !== 'function' && i !== 'length' )
      res.push( i );
    }
    return res;
  }

  term.echo = echo;
  function echo( text, color ){
    return term.addLine( function( elem ){
      return $( elem ).text( text ).css({
        color: color || 'white',
      });
    });
  }

  /////////////
  // HELPERS //
  /////////////

  var helpers = term.helpers = {};
  helpers.compact = compact;
  helpers.isOdd   = isOdd;
  helpers.last    = last;
  helpers.length  = length;
  helpers.map     = map;
  helpers.not     = not;
  helpers.pipe    = pipe;
  helpers.trim    = trim;
  helpers.truthy  = truthy;
  helpers.existy  = existy;
  helpers.isEmpty = isEmpty;
  helpers.isChar  = isChar;
  helpers.split   = split;
  helpers.keys    = keys;
  helpers.tail    = tail;

  function split( pattern ){
    return function( item ){
      return item.split( pattern );
    };
  }

  /**
   * checks if a value exists and is truthy
   *
   * @param {*} v - a value to check
   *
   * @returns {bool}
   *
   */
  function truthy( v ){
    return ( existy( v ) && ( v !== false ) );
  }

  /**
   * checks if the value equals null or undefined
   *
   * @param {*} v - a value to check
   *
   * @returns {bool}
   *
   */
  function existy( v ) {
    console.log( v );
    return ( v != null || typeof( v ) != undefined );
  }

  function isEmpty( v ){
    return ( v.length === 0 );
  }

  /**
   * check if a string is a character. A character can either be lower or
   * uppercase.
   *
   */
  function isChar( string ){
    return ( ( typeof( string ) === 'string' ) && ( string.length === 1 ) );
  }

  /**
   * helper to make the code a bit more readable
   *
   * @param {function} fn - the map function
   *
   * @returns {function} a function that takes an array
   *
   */
  function map( fn ){
    return function( list ){
      return list.map( fn );
    };
  }

  /**
   * returns a function that runs commands from the left argument to the right.
   * The return value is passed to the next function. The return value of the
   * last function defined in arguments is the value returned.
   *
   * @param {function*} - many functions
   *
   * @returns {*}
   *
   * @example
   * //returns [ 'hello', 'world' ]
   * pipe(
   *   function( v ){ return v.split( ' ' ); }
   * )( 'hello world' )
   *
   */
  function pipe( ){
    var funcs = arguments;
    return function( v ){
      var res = v;
      for ( var key in funcs ){
        var fn = funcs[key];
        res = fn( res );
      }
      return res;
    };
  }

  function tail( array ){
    return array.slice( 1, array.length );
  }

  function keys( object ){
    var r = [];
    for ( var key in object ){
      r.push( key );
    }
    return r;
  }

  function trim( string ){
    return string.trim( );
  }
  function not( v ){
    return !v;
  }

  function compact( array ){
    return array.filter( truthy );
  }

  function isOdd( v ){
    return ( v % 2 === 1 );
  }

  function length( item ){
    return item.length;
  }

  function contains( array, item ) {
    return ( array.indexOf( item ) !== -1 );
  }

  function last( items ){
    return items[ items.length - 1 ];
  }

})( window );

console.log( 'loaded: termjs' );
