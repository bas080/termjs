/**
 * parses a string and returns an object containing the different commands and
 * pipes that are defined
 *
 */
function parse( promptString ){
  return function( string ){
    var string = string || promptString();
    // string = String( string )
    //   .replace( /&amp;/g ,'&' )
    //   .replace( /&quot/g ,'"' )
    //   .replace( /&#39;/g ,"'" )
    //   .replace( /&lt;/g  ,'<' )
    //   .replace( /&gt;/g  ,'>' );
    return string.split( '&&' )
    .map( function( paragraph ){
      return paragraph.split( '|' );
    })
    .map( function( sentence ){
      return sentence.map( function( words ){
        return words.trim().replace( / +/g, ' ' ).split( ' ' );
      });
    })
    .map( function( paragraph ){
      return paragraph.map( function( words ){
        return {
          name: words[0] ,
          args: words.slice( 1, words.length )
        };
      });
    });
  };
}

/**
 * splits array into multiple arrays. It is similar to the String.split
 * function but then for arrays.
 *
 * @param {array} array
 * @param {string|pattern}
 *
 * @returns {array}
 *
 * @example
 * //returns [ [ 'a' ], [ 'c' ], [ 'd', 'e' ] ]
 * splitArray( [ 'a', 'b', 'c', 'b', 'd', 'e' ], 'b' )
 *
 */
function splitArray( array, pattern ){
  return array.reduce( function( acc, item ){
    //SHOULD: make this function also support patterns
    console.log( acc[acc.length-1]);
    if ( item == pattern )
      acc.push( [] );
    else
      acc[ acc.length -1 ].push( item );
    return acc;
  }, [[]] );
}

