( function( ){

  term.command( 'mods', function( args, input ){
    try {
      return mods[ args[0] ]( args[1] );
    } catch (e) {
      return [
        e,
        'usage: man mods',
      ].join( '\n');
    }
  });

  var saved = term.read( 'mods_installed' ) || [ 'mods' ];
  var installed = [ 'mods' ];

  var mods = {
    install: install( installed, save ),
    uninstall: uninstall( installed ),
    list: list( installed ),
  };

  saved.forEach( function( mod_name ){
    return mods.install( mod_name );
  });

  function install( installed, save ){
    return function( mod_name ){

      if ( installed.indexOf( mod_name ) !== -1 ){
        term.echo( 'is installed: ' + mod_name, 'orange' );
        return;
      }

      var e = term.echo( 'installing: ' + mod_name );

      $.getScript( "scripts/mods/"+mod_name+".js" )
        .done( downloadSucces( mod_name ) )
        .fail( downloadFail( mod_name ) );

      function downloadFail( mod_name ){
        return function( ){
          return term.echo( 'cannot install: ' + mod_name, 'red' );
        }
      }

      function downloadSucces( mod_name ){
        return function( ){
          if ( save( mod_name ) )
          return term.echo( 'installed: ' + mod_name, 'lime' );
          return term.echo( 'reinstalled: ' + mod_name, 'yellow' );
        };
      }

      return;

    }
  }

  function uninstall( installed ){
    return function( mod_name ){
    }
  }

  function save( installed ){
    return function( mod_name ){
      if ( installed.indexOf( mod_name ) == -1 ){
        installed.push( mod_name );
        term.write( 'mods_installed', installed );
        return true;
      }
      return false;
    };
  }

  mods.save = save( installed );

  function list( installed ){
    return function( ){
      installed.forEach( term.echo )
    };
  }


})();
