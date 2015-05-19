
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

  term.package.register( 'youtube',{
    version:      0.4,
    version_name: 'regelisious',
    dependencies: [ '' ]
  });

  term.command.register ( 'youtube', function( ){
    var playlist = [ ];
    var commands = {
      search : function( p ){
        player.getIframe( ).className = 'mini';
        var qry = p.slice( 2, p.length ).toString( ).replace( /,/g, '+' );
        var url = 'http://gdata.youtube.com/feeds/api/videos/-/'+qry+'?max-results=7&orderby=relevance'; //&category=music&orderby=rating
        var reformed  = [ ];
        var playlist = [ ];
        qwest.get( url) .then( function( data ){
          var results = data.match('watch.v=.{11}', 'g')
          tada = results;
          for ( var i = 0, l = results.length; i < l; i ++ ) {
            var id = results[i].slice(8);
            playlist.push( id );
          }
          player.cuePlaylist( playlist );
          term.output.add( term.helpers.list( reformed ) );
        } );
      },
      subscriptions : function( p ){

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
    };
    var player = new YT.Player( 'player', {
      playerVars: { 'autoplay': 0, 'controls': 0 },
      events: {
        'onReady': onPlayerReady,
        'onStateChange': onPlayerStateChange
      }
    } );
    this.on_command = (function( commands ){
      return function(p, input){
        return commands[ p[1] ]( p );
      }
    })(commands);
    this.on_complete = function(p){
      return term.helper.keys(commands);
    };
  } );
}
