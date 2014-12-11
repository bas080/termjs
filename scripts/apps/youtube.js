( function( ){
  var element = document.createElement( 'div' );
  element.id = 'player';
  document.getElementsByTagName( 'body' )[ 0 ].appendChild( element );
  var tag = document.createElement( 'script' );
  tag.src = "https://www.youtube.com/iframe_api";
  var firstScriptTag = document.getElementsByTagName( 'script' )[ 0 ];
  firstScriptTag.parentNode.insertBefore( tag, firstScriptTag );
} )( );

function onYouTubeIframeAPIReady( ) {
  term.commands.register ( 'youtube', function( ){
    var playlist = [ ];
    var onPlayerReady = function( event ) {
    };
    var onPlayerStateChange = function( event ) {
      /*
       -1 – unstarted
        0 – ended
        1 – playing
        2 – paused
        3 – buffering
        5 – video cued
      */
      if ( player.getIframe( ).className == '' )
        player.getIframe( ).className = 'mini';
      console.log( event.data );
    };
    var player = new YT.Player( 'player', {
      playerVars: { 'autoplay': 0, 'controls': 0 },
      events: {
        'onReady': onPlayerReady,
        'onStateChange': onPlayerStateChange
      }
    } );
    var get_youtubeId = function( link ){
      var video_id = link.split( 'v=' )[ 1 ];
      var ampersandPosition = video_id.indexOf( '&' );
      if( ampersandPosition != -1 ) {
        video_id = video_id.substring( 0, ampersandPosition );
      }
      return video_id;
    };
    this.on_command = function( p, input ){
      var commands = {
        search : function( p ){
          var qry = p.slice( 2, p.length ).toString( ).replace( /,/g, ' ' );
          var url = 'http://gdata.youtube.com/feeds/api/videos/-/'+qry+'?max-results=7&orderby=rating&category=music';
          var reformed  = [ ];
          var playlist = [ ];
          d3.xml( url, function( data ){
            var results = data.getElementsByTagName( 'entry' );
            for ( var i = 0, l = results.length; i < l; i ++ ) {
              var v = results[ i ];
              var id = v.getElementsByTagName( 'link' )[ 0 ].getAttribute( 'href' );
              var title = v.getElementsByTagName( 'title' )[ 0 ].textContent;
              id = get_youtubeId( id );
              reformed.push( term.helpers.string( [ i, title, id ] ) );
              playlist.push( id );
            }
            console.log(player);
            player.cuePlaylist( playlist );
            term.output.add( term.helpers.list( reformed ) );
          } );
        },
        load : function( p ) {
          player.loadVideoById( p[ 2 ] );
        },
        pause : function( ){
          player.pauseVideo( );
        },
        stop : function( ){
          player.stopVideo( );
        },
        play : function( p ) {
          if ( p[ 2 ] )
          player.playVideoAt( p[ 2 ] );
          else
          player.playVideo( );
        },
        volume : function( p ) {
          player.setVolume( p[ 2 ] );
        },
        opacity : function( p ){
          //TODO set opacity of video player
        },
        info : function( p ){
          return player.getVideoData( ).title;
        },
        playlist : function( ){

        },
        fullscreen : function( ){
          player.getIframe( ).className = 'fullscreen';
        },
        normal : function( ){
          player.getIframe( ).className = 'normal';
        },
        mini : function( ){
          player.getIframe( ).className = 'mini';
        },
        hide : function( p ){
          player.getIframe( ).className = '';
        },
        skip : function( p ){
          player.nextVideo( );
        },
        mute : function( p ){

        },
        seek : function( ) {
        }
      };
      return commands[ p[ 1 ] ]( p );
    };
  } );
}
