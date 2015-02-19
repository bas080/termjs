var log = function (val) {
  console.log(val);
  return val;
};

wru.test([{
  name : 'term.variables',
  init : function () {
    term.variables('test', 'one');
    term.variables('test', 'two');
  },
  test : function(){
    wru.assert( 'gets an empty variable'    , term.variables('empty') === undefined );
    wru.assert( 'gets an existing variable' , term.variables('test') === 'two' );
  }
},{
  name : 'term.keyboard',
  test : function () {
    wru.assert( 'presses on key a', term.keyboard.combo( { key : 'a' } ) == 'a' );
    wru.assert( 'presses on key Shift + a', term.keyboard.combo( { shiftKey : true, key : 'A' } ) == 'A' );
    wru.assert( 'presses on key Ctrl + a', term.keyboard.combo( { ctrlKey : true, key : 'a' } ) == 'Ctrl a' );
  },
},{
  name : 'term.command',
  init : function () {
    term.command.register( 'conflict', function () {
      this.on_command = function (p, i) {
      };
    });
  },
  test : function () {
    wru.assert( 'registers command', term.command.register('test',function () { }));
    wru.assert( 'searches for command where name is test', term.command.where([['name','test']])[0] == 'test' );
    wru.assert( 'registers command that already exists', term.command.register('conflict',function(){}) == false);
    wru.assert( 'remove command from registry', term.command.remove( 'test',
    "conflict" ).toString() == 'test,conflict');
  },
},{
  name : 'term.shortcut',
  init : function () {
    term.shortcut.register( 'Ctrl r', function () {
      return 'it works';
    });
  },
  test : function () {
    wru.assert( 'simulate player presses ctrl r', term.shortcut.perform('Ctrl r') == 'it works');
    wru.assert( 'player presses Ctrl r', term.keyboard.keydown({ ctrlKey : true, key : 'r' }) == 'it works' );
  }
},{
  name : 'term.screen',
  init : function () {
    term.screen.pre_cursor.text('');
  },
  test : function () {
    wru.assert( 'writes hello world', term.screen.cursor.write('hello world') == 'hello world' );
    wru.assert( 'removes one character left', term.screen.cursor.remove(-1) == 'hello worl' );
    wru.assert( 'moves two characters to left', term.screen.cursor.move(-2) == 8 );
    //wru.assert( 'cleares the commandline', term.screen.commandline.clear() == '');
  }
},{
  name : 'term.complete',
  init : function () {
    term.command.register('axa',function () { this.on_complete = function(){ return [ 'ba','bb','bc' ] }});
    term.command.register('axb',function () { });
    term.command.register('axc',function () { });
    term.screen.commandline.text('ax');
  },
  test : function () {
    wru.assert( 'gets suggestions for ax string', ( term.complete().toString() == 'axa,axb,axc') );
    wru.assert( 'gets parameters suggestions',      ( log(term.command.options(
    ['axa', 'b'] ).toString()) == 'ba,bb,bc' ) );
  }
}]);
