( function( term ){

  term.keybinding( 'Tab', autocomplete )

  var _ = term.helpers;

  function autocomplete( ){

    var pieces = term.preCursorString( ).split( '|' ).map( _.split( '&amp;&amp;' ) );

    var words = _.last( _.last( pieces ) ).trimLeft( ).split( ' ' )

    if ( isCommand( words ) )
      return console.log( potentialOptions( words[0], _.keys( term.commands ) ) );
    return term.completions[ words[0] ]( _.tail( words ) );

  }

  function potentialOptions( substring, options ){
    return options.filter( function( option ){
      return ( option.indexOf( substring ) !== -1 );
    });
  }

  function isCommand( words ){
    return ( words.length === 1 );
  }

})( term );
