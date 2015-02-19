term.package.register('search',{  //name, defenitions
  version:      0.01,             //updating about updates (not used yet)
  version_name: 'kwek'            //because I can
});

term.command.register( 'search', function( ){
  var default_se = localStorage.getItem('search_default') || 'duckduckgo';
  var engines = {
    duckduckgo : {
      base : 'https://duckduckgo.com/?q=',
      seperator : '+'
    },
    google : {
      base : 'https://www.google.es/search?q=',
      seperator : '+'
    }
  };
  var keywords = term.helper.keys( engines );
  this.on_command = function( p, input ){
    if ( p[1] == 'default' ){
      if ( keywords.indexOf(p[1]) === -1 ){
      term.screen.pre_commandline.add(p[1]+' does not exist');
      }else{
      localStorage.setItem('search_default', p[1] );
      }
    }
    if ( keywords.indexOf( p[1] ) === -1 ) {
      var engine = engines[default_se];
      var keys = p.slice(1);
    }else{
      var engine = engines[p[1]];
      var keys = p.slice(2);
    }
    var base = engine.base;
    var quer = keys.join('+');
    var urls = base+quer;
    term.screen.pre_commandline.add( urls );
    window.open( urls );
  };
  this.on_complete =function( p ){
    if ( p[1] !== undefined ){
      var options = keywords;
      options.push('default');
      return options;
    }else if( p[1] === 'default' ){
      return keywords;
    }
  };
} );
