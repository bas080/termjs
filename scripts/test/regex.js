wru.test({
  name: 'grep command',
  test: function(){
    wru.test( term.command.execute('echo hello world | grep o g' ) , [0,0] );
  }
});
