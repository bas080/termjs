( function( ){

  term.command( 'list', list );

  function list( args, inp ){
    inp.forEach( term.echo );
  }

})();
