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

// -- stdlib --
window.pure = function(a)
{
  return function(_)
  {
    return a;
  };
};
// pure :: a -> IO a
window.bind = function(m)
{
  return function(f)
  {
    return function(_)
    {
      return f(m())();
    };
  };
};
// bind :: IO a -> (a -> IO b) -> IO b
window.exec = function(m)
{
  return m();
};
// exec :: IO a -> a
window.wrap = function(f)
{
  return function(a)
  {
    return function(_)
    {
      return f(a);
    };
  };
};
// -- runtime --
Object.defineProperty(window, "world",
{
  set: exec
});

// wrap :: (a -> b) -> (a -> IO b)
window.log = wrap(console.log.bind(console));

world = log('------------------------');
