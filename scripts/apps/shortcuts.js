//Default keyboard shortcuts
term.keyboard.shortcut( 'Ctrl r', function( ){
  window.location.reload( );
} );

term.keyboard.shortcut( 'Ctrl l', function( ){
  term.output.innerHTML = '';
} );

term.keyboard.shortcut( 'Ctrl c', function( ){
  term.interface.reset( );
} );

term.keyboard.shortcut( 'Alt Backspace', function( event ){
  var remove_word = function( text ){
    var text_trimmed = text.trim( );
    var text_words = text_trimmed.split( ' ' );
    var text_return = '';
    for ( var i = 0, l = text_words.length-1; i < l; i ++ ) {
      text_return += text_words[ i ]+' ';
    }
    return text_return;
  };
  term.input.innerHTML = remove_word( term.input.innerHTML );
} );

term.keyboard.shortcut( 'Backspace', function( event ){
  term.input.innerHTML = term.input.innerHTML.slice( 0, term.input.innerHTML.length-1 );
} );

term.keyboard.shortcut( 'Enter', function( ){
  var command = term.input.innerHTML;
  term.interface.execute( command );
} );

term.keyboard.shortcut( 'Up', function( ){
  return term.interface.history( -1 );
} );

term.keyboard.shortcut( 'Down', function( ){
  return term.interface.history( 1 );
} );

term.keyboard.shortcut( 'Tab', function( event ){
  term.autocomplete.complete( term.input.innerHTML );
} );
