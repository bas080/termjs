var autocomplete = {};

( function( ){

  function search( candidates, string ){
    function beginsWith( substring ){
      return function( string ){
        return ( string.slice( 0, substring.length ) == substring );
      };
    }
    return candidates.filter( beginsWith( string ) );
  }

  autocomplete.search = search;

  //autocomplete

    //var commandlinestr = Term.screen.commandline.text();
    //var commandstr = commandlinestr.replace('&', '|').split('|');
    //var parameters = commandstr[commandstr.length-1].replace(/^ */, '').split(' ');
    //var is_command = ( parameters.length == 1 );
    //var options = [];
    //if ( is_command ) //get options
    //  options = Term.command.where([]);
    //else
    //  options = Term.command.options( parameters );
    //var opt_string;
    //var suggestion = [];
    //var sub_string = parameters[parameters.length-1];
    //for ( i in options ){ //get suggestions
    //  opt_string = options[i].slice(0, sub_string.length);
    //  if ( sub_string == opt_string )
    //  suggestion.push(options[i]);
    //}
    //if ( suggestion.length === 1 ){
    //  var sub_append = suggestion[0].slice(sub_string.length);
    //  Term.screen.cursor.write( sub_append + ' ' );
    //}else if ( suggestion.length !== 0 ){
    //  Term.screen.pre_commandline.add(commandlinestr)
    //  Term.screen.pre_commandline.add(suggestion.join(' '));
    //}else{
    //  Term.screen.pre_commandline.add(' ');
    //}
    //return suggestion;

})();
