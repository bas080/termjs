window.strokey = {};

(function( strokey ){

  'use strict';

  strokey.onKeyPress = onKeyPress;

  window.addEventListener( 'keypress', keyPress );

  var on_key_press = function( ){ };

  function onKeyPress( fn ){
    on_key_press = fn;
  }

  function keyPress( event ){
    return on_key_press( keyString( event ), event );
  }

  var keycodes = {
    8 : "Backspace",
    9 : "Tab",
    13: "Enter",
    17: "Ctrl",
    18: "Alt",
    27: "Esc",
    33: "PageUp",
    34: "PageDown",
    35: "End",
    36: "Home",
    37: "Left",
    38: "Up",
    39: "Right",
    40: "Down",
    46: "Delete",
  };

  function isChar( key_string ){
    return ( key_string.length === 1 );
  }

  function keyString( event ){
    var code = keycodes[ event.keyCode ] || String.fromCharCode( event.charCode );
    var key_string = '';
    if ( event.ctrlKey )
    key_string += 'Ctrl ';
    if ( event.altKey )
    key_string += 'Alt ';
    key_string += code
    return key_string;
  }

})( window.strokey );

console.log( 'loaded: strokey');
