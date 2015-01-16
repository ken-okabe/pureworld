/* jshint node: true */
/* jshint sub: true */
/* global window,document, $,alert,history */

"use strict";

if (typeof(window) === 'undefined')
{
  console.log('pureworld in node/iojs');
  global.window = global;
}
else
{
  console.log('pureworld in browser');
}

window.seq = function(x, y)
{
  return function()
  {
    return x(), y();
  };
}

window.action = function(x)
{
  return function(y)
  {
    return y ? action(seq(x, y)) : x();
  };
}

// log :: a -> IO b
// log :: a -> IO c -> IO c

// seq :: IO a -> IO b -> IO b

window.bind = function(x, y)
{
  return function()
  {
    return y(x())();
  };
}

window.wrap = function(f)
{
  return function(x)
  {
    return action(function()
    {
      return f(x);
    });
  }

}


window.log = wrap(console.log);

// -- runtime --
Object.defineProperty(window, "world",
{
  set: function(m)
  {
    return m();
  }
});