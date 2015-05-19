term.command.register('maze', function(){
  this.maze = [];
  this.moves = [];
  this.commands = new (function(maze){
    this.new = function(size){
      var generate_maze = function(size){
        var maze = [];
        var random = function(){
          return Math.floor(Math.random()*size)+1;
        };
        for ( i=0; i<size; i++ ){
          maze[i] = [
            random(),
            random(),
            random(),
            random()
          ];
        }
        return maze;
      };
      var routes = function(maze){
      };
      var maze = generate_maze(25);
      tadamaze = maze;
      tadaresu = routes(maze);
    };
    this.move = function(maze){
    };
    this.moves = function(moves){
    };
  })(this);

  this.on_command = (function(maze){
    return function(p, i){
      return maze.commands[p[1]](p);
    };
  })(this);
  this.on_complete = function(p){
    return term.helper.keys(commands);
  };
  this.manual = '\
    blindmaze\
    done'
});

wru.test(
  {
    name : 'maze - create new maze',
    test : function () {
      wru.assert( 'crate a maze', term.env.commands.maze.commands.new(20));
    }
  }
);
