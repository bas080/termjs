var autoload = (function () {
  var data;

  var meta = document.createElement('meta');
  meta.setAttribute( 'http-equiv', 'expires');
  meta.setAttribute( 'content', '-1');
  document.head.appendChild( meta );

  try {
    data = JSON.parse(localStorage.getItem('autoload'));
    if ( data === null )
    throw "data is null";
  } catch (e) {
    data = {
      "updateTime" : 1000,
      "lastModified" : (new Date(document.lastModified)).getTime()
    };
  }
  console.log('Reloading in '+(data.updateTime/1000).toFixed(2)+' seconds.');

  data.minimumUpdateTime = 2000;
  data.maximumUpdateTime = 60000;
  return data;
})();
var timeout = setTimeout( function(){
  autoload.previousModified = autoload.lastModified;
  autoload.lastModified = (new Date(document.lastModified)).getTime();

  if ( autoload.lastModified == autoload.previousModified ){
    autoload.updateTime = Math.min(autoload.updateTime+1000, autoload.maximumUpdateTime);
  }else{
    autoload.updateTime = Math.max( autoload.minimumUpdateTime, 5000);
  }

  localStorage.setItem('autoload', JSON.stringify(autoload));
  window.location.reload( );
}, autoload.updateTime);
autoload.pause = function(){
  clearTimeout(timeout);
  console.log('Paused the autoloader');
  return true;
};
