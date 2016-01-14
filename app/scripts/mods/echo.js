( function(){

  term.command( 'echo', echo );

  function echo( args ) {

    return args.join( ' ' );
  }

})();
