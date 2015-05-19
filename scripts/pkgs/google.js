term.package.register('google',{ //name of the package. Consider this the identifier
  version:      0.01,             //important for checking if user hase latest version.
  version_name: 'googish'    //cause I can
});

term.command.register( 'google', function( ){
  this.on_command = function( p, input ){
    var bse = 'https://www.google.es/search?q=';
    var qry = p.slice( 1, p.length ).toString( ).replace( /,/g, '+' );
    var url = bse+qry;
    window.open( url );
  };
} );
