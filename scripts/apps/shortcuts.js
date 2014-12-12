//Default keyboard shortcuts
term.keyboard.shortcut( 'Ctrl r', function( ){
  window.location.reload( );
} );

term.keyboard.shortcut( 'Ctrl l', function( ){
  term.output.clear( );
} );

term.keyboard.shortcut( 'Ctrl c', function( ){
  term.interface.reset( );
} );

term.keyboard.shortcut( 'Alt Backspace', function( event ){
  term.input.backspace( true );
} );

term.keyboard.shortcut( 'Backspace', function( event ){
  term.input.backspace( );
} );

term.keyboard.shortcut( 'Enter', function( ){
  term.history.reset( );
  term.commands.execute( term.input.value( ) );
} );

term.keyboard.shortcut( 'Up', function( ){
  return term.history.get( 1 );
} );

term.keyboard.shortcut( 'Down', function( ){
  return term.history.get( -1 );
} );

term.keyboard.shortcut( 'Left', function( ){
  term.input.move_cursor( -1 ); //negative is left
} );

term.keyboard.shortcut( 'Right', function( ){
  term.input.move_cursor( 1 ); //negative is left
} );

term.keyboard.shortcut( 'Tab', function( ){
  term.autocompleter.complete( term.input.value( ) );
} );

term.keyboard.shortcut( 'Tab Tab', function(){
  term.autocompleter.suggest();
}, true);
