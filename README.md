jUnix
=====
jUnix is a javascript library which enables developers to add a command line
interface like interaction to their browser projects. See this <a
href='demo.html'>DEMO</a> to see what I mean. 

The plan is to make a command line interface style console in a browser. The
goal is to make something fun and usefull. However I will try to leverage 
the power of javascript and not just copy unix console features blindly. A vim
like editor would be awesome though!

Modularity is important. It should be relatively easy to change and extend
features, while keeping the core small.

Let's go over the features.

Features
--------
###Command line interface (CLI)
**Command line interface-ish interaction.** It basicly simulates a terminal's
interaction. Including things like pipes *|*, paralell *&* and sequential *&&*
commands.

###Commands
Except for being able to run builtin "pure" javascript functions, it is also possible to
register commands and use them in a similar way to a unix system. You can also
combine these two. The registered packages and commands can be seen with the
following commands.

```bash
> commands #shows all commands available

> packages #shows all packages registered

> manual commands #shows the manual page of the "commands" command
```

Use **manual** *command_name* to read more about that command. This wil only work
if manual variable is defined in the command its definition.

These commands should help you get on you way. It should feel natural if you are
a unix user.

###API
**A simple API.** 
It allows the registering of commands and shortcuts. Furthermore it has
functions to interact with other elements of the jUnix terminal.

**register command**
```javascript
//simple example of the echo command
term.command.register( 'echo', function(){ //is a constructor
  this.on_command = function(p, i){ //p are the parameters in an array and i is the pipe input. Will be undefined if none is given
    return p.slice( 1 ).join(' ');
  };
});
```

**register shortcut**
```javascript
term.keyboard.register( 'Ctrl c', function( ){
  term.input.value(''); //set the input line to nothing
});
```

**register alias**
```javascript
TODO
```

**Getting and setting input line values**
```javascript
//Get or set the string after the cursor.
term.input.post();
  //or
term.input.post( string );

//Get or set the cursor string value
term.input.cursor();
  //or
term.input.cursor( string );

//Get ir set the text before the cursor
term.input.pre();
  //or
term.input.pre( string );
```

###packages
A package is a bundle of commands, shortcuts functions and/or data. 

Using packages makes it easier for users to load and unload the packages they
want. It also enables developers to easily version and bundle their commands.

It is easy to make a package. Packages can be loaded with the "load" command.
This command is defined in the "term/packages/default.js". The load command is
further explained in the **commands** section.  
What makes a package different compared to a normal javascript file is the
following.

Package files have the "term.package.register" function. They should always be
defined at the top of the file. If not it will not register what commands and
shortcuts belong to it. Let's look at an example of a package register function.

```javascript
term.package.register({
  name:         'regex',        //name of the package. Consider this the identifier
  version:      0.4,            //important for checking if user hase latest version.
  version_name: 'regelisious'   //cause I can
});

//example of the registering of a command
term.command.register( 'random', function(){
  this.on_command = function(){
    return Math.random();
  };
});
```

Technically it is possible to register multiple packages in the same file. For
modularity sake I do not advice it.  
The load command will remember what file
belongs to what package. This makes it easy to find out what package belongs to
what javascript file. Use the **packages** command to see all packages and their
filename. It is adviced to keep the package name and the javascript file name
the same for ease of use.

```javascript
//example of packages command output TODO
```

Commands and shortcuts that are registered beneath the package function will be
considered part of that package. You can see what package a command belongs to
by using the command **package** *command_name*. When removing a package with
**unload**, it removes the shortcuts and commands registered to it.

Setup
-----
**Initiating a "terminal" requires the following.**

*Add to <head> ... </head>*
```html
  <script src="scripts/libs/term.js"    type="text/javascript" charset="utf-8"></script>
  <script src="scripts/cmds/install.js" type="text/javascript" charset="utf-8"></script>
  <script src="scripts/cmds/default.js" type="text/javascript" charset="utf-8"></script>
```

By default it wil render the terminal in the element with id='terminal'. This
can be changed in the *term.js* on the last line of the file.
