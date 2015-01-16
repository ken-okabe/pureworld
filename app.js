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


// unit :: a -> IO a
var unit = function(x)
{
  return function()
  {
    return x;
  };
};

// bind :: IO a -> (a -> IO b) -> IO b
var bind = function(x, y)
{
  return function()
  {
    return y(x())();
  };
};

// seq :: IO a -> IO b -> IO b
var seq = function(x, y)
{
  return function()
  {
    return x(), y();
  };
};

var action = function(x)
{
  return function(y)
  {
    return y ? action(seq(x, y)) : x();
  };
};

var wrap = function(f)
{
  return function(x)
  {
    return action(function()
    {
      return f(x);
    });
  };
};

var log = wrap(console.log);

var pureworld = {
  unit: unit,
  bind: bind,
  seq: seq,
  action: action,
  wrap: wrap,
  log: log
};

// -- runtime --
Object.defineProperties(window,
{
  world:
  {
    set: function(w)
    {
      return w();
    }
  }
});

module.exports = pureworld;