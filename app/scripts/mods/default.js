( function(){

  'use strict';

  term.keybinding( 'Backspace', function( event ){
    var pre = term.elements.pre_cursor;
    pre.innerHTML = pre.innerHTML.slice( 0, pre.innerHTML.length - 1 );
  });

  term.keybinding( 'Home', function( event ){
    return term.moveCursor( 0 );
  });

  term.keybinding( 'End', function( event ){
    console.log( 'end');
    return term.moveCursor( term.promptString().length - 1 );
  });

  term.keybinding( 'Left', function( event ){
    return term.moveCursor( -1, true );
  });

  term.keybinding( 'Right', function( event ){
    return term.moveCursor( 1, true );
  });

  term.keybinding( 'Ctrl Right', function( event ){
    var pos = term.elements.post_cursor;
    var index = pos.innerHTML.search(/\s\S/g) + 1;
    if ( index == 0 )
    return term.moveCursor( term.promptString().length );
    return term.moveCursor( index, true );
  });

  term.keybinding( 'Ctrl Left', function( event ){
    var pre = term.elements.pre_cursor;
    var index = pre.innerHTML.split('').reverse().join('').search( /\S\s/g );
    if ( index == -1 )
    return term.moveCursor( 0 );
    return term.moveCursor( -index-1, true );
  });

  term.keybinding( 'Delete', function( event ){
    var pos = term.elements.post_cursor;
    var cur = term.elements.cursor;
    if ( pos.innerHTML.length == 0 )
    return cur.innerHTML = ' ';
    cur.innerHTML = pos.innerHTML[0];
    pos.innerHTML = pos.innerHTML.slice( 1, pos.innerHTML.length );
  });

  term.keybinding( 'Alt Backspace', function( event ){
    var pre = term.elements.pre_cursor;
    var trimmed = pre.innerHTML.length - pre.innerHTML.trimRight().length;
    var parts = pre.innerHTML.trimRight().split( ' ' );
    var last_part = parts[ parts.length - 1 ];
    var index = pre.innerHTML.length - last_part.length - trimmed;
    pre.innerHTML = pre.innerHTML.slice( 0, index );
  });

  term.keybinding( 'Ctrl c', function( event ){
    term.elements.pre_cursor.innerHTML = '';
    term.elements.cursor.innerHTML = ' ';
    term.elements.post_cursor.innerHTML = '';
  });

  term.keybinding( 'Enter', function( event ){
    var str = term.promptString();
    term.elements.pre_cursor.innerHTML = '';
    term.elements.cursor.innerHTML = ' ';
    term.elements.post_cursor.innerHTML = '';
    term.echo( str, 'aqua' );
    var result =  term.run(
      term.parse( str )
    );
    term.addLine( function( elem ){
      return elem.innerHTML = result;
    });
  });

  term.command( 'commands', function( ){
    var r = [];
    for ( var key in term.commands ){
      r.push( key );
    }
    return r;
  });

  term.command( 'files' , function( ){
    return term.files();
  });

  term.command( 'clear', function( ){
    term.elements.lines.innerHTML = '';
  });

  term.keybinding( "'", function( event ){
    console.log( "'");
    event.preventDefault();
    return false;
  });

})();
