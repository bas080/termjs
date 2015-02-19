term.package.register('search',{ //name of the package. Consider this the identifier
  version:      0.01,             //important for checking if user hase latest version.
  version_name: 'kwek'    //cause I can
});

term.command.register( 'search', function( ){
  var engines = {
    duckduckgo : {
      base : 'https://duckduckgo.com/?q=',
      sepe : '+'
    },
    google : {
      base : 'https://www.google.es/search?q=',
      sepe : '+'
    }
  };
  this.on_command = function( p, input ){
    var bse = 'https://www.google.es/search?q=';
    var qry = p.slice( 1, p.length ).toString( ).replace( /,/g, '+' );
    var url = bse+qry;
    window.open( url );
  };
} );
