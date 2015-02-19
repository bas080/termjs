function Datasystem(){

  this.data;
  this.current = {
    folders : [],
    files   : [],
  };

  this.load = (function(cons){
    cons.data = JSON.parse( localStorage.getItem('data') );
  })(this);

  this.save = (function(cons){
    return function(){
      localStorage.setItem( 'data', JSON.stringify(cons.data) );
    };
  })(this);

  (function(cons){ //testing purpose //TODO remove when done testing
    d3.json( 'data/files.json', function( data ){ cons.data = data; cons.save(); } );
  })(this);

  this.edit = (function(cons){ //manipulate the data
    return function(path, data){ //path is array and data is JSON
      cons.data[path] = data;
      save(); //save data with every edit TODO maybe make this only happen when user explicitlu asks
      return data;
    }
  })(this);

  this.current = (function(cons){
    return cons.data;
  })(this);

  term.commands.register( 'cd', function(cons){
    this.on_complete = function( p ){
      return d3.keys(cons.current);
    };
    this.on_command = function( p, pipein ){
      var ar = [];
      cons.current
      for ( k in cons.current[ p[1] ] ){
        console.log(cons.current);
        if ( typeof(cons.current[k]) == 'object' ){
          ar.push( cons.current[k]);
        }else{
          //ar.push( cons.current[k][0]);
        }
      }
      cons.current = cons.current[ p[1]];
      console.log(ar);
      return ar;
    };
  }, this);

  term.commands.register( 'ls', function( cons ){
    this.on_complete = function( p ){
    };
    this.on_command = function( p, pipein ){
      return d3.keys(cons.current);
    };
  }, this);

  term.commands.register( 'pwd', function(cons){
    this.on_command = function( p, pipeing ){
    };
  }, this);

}

a = new Datasystem();

term.commands.register( 'wget' , function( data ){ //used to load and save data in string/dom/array/object format
  this.on_command = function( p, pipein ){
    var path = p[1];
    var data = p[2] || data;
  };
});

term.commands.register( 'cat' , function( data ){
  this.on_command = function( params, pipein ){
    term.output.add(data);
  };
});
