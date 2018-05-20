(function() {

  'use strict';

  //# identity :: a -> a
  //.
  //. Returns its argument.
  //.
  //. ```javascript
  //. > identity ([1, 2, 3])
  //. [1, 2, 3]
  //. ```
  function identity(x) { return x; }

  module.exports = identity;

} ());
