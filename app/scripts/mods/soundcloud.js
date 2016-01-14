( function( ){

  'use strict';

  var soundcloud = {};

  $.getScript( "scripts/libs/sc.js" )
    .done( setup );

  function setup( ) {
    SC.initialize({
      client_id: 'ccde487708689a2c955afb6a479812b7'
    });
  }

  term.command( 'soundcloud', function( args, input ){
    return soundcloud[ args[0] ].apply( null, args.slice( 1, args.length ) );
  });

  soundcloud.results = [];

  soundcloud.playing;

  soundcloud.search = search;
  function search( query ){
    var query = arguments[0];
    SC.get('/tracks', { q: query }, function( results ) {
      soundcloud.results = results;
      function createItemElem( item, index ){
        var cont = $( '<div>' ).css({
          position: 'relative',
        });
        var desc = $( '<div>' ).css({
          display: 'inline-block',
          'overflow-x': 'hidden',
          'white-space': 'pre-line',
        });
        var title = $( '<div>' ).text(
          ( index + 1 ) + ' ' + item.title
        );
        var user = $( '<span>' ).css({
          color: 'white',
          'background-color': 'black',
          opacity: 0.5,
        }).text( item.user.username );
        desc.append( [ title, user ] );
        return cont.append( [ desc ] );
      }
      var images = results.map( createItemElem );
      term.addLine( function( elem ){
        $(elem).append( images );
      });
    });
  }

  soundcloud.play = play;
  function play( index ){
    var track = soundcloud.results[ index - 1 ];
    term.addLine( function( elem ){
      $(elem).text(
        'playing: ' + index + ' ' + track.title
      );
    });
    SC.stream("/tracks/"+track.id, function( sound ){
      if ( soundcloud.playing )
      soundcloud.playing.stop();
      sound.play();
      soundcloud.playing = sound;
    });
  }

  term.alias( 'sc', 'soundcloud' );

})();
