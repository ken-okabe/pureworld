/* jshint node: true */
/* jshint sub: true */
/* global window,document, $,alert,history */

"use strict";

var pureworld = require('./app');

Object.keys(pureworld)
  .map(function(key)
  {
    window[key] = pureworld[key];
  });



var asyncF = function(callback)
{
  setTimeout(function()
  {
    for (var i = 0; i < 1000000000; i++)
    {

    };

    callback("async process Done!");
  }, 0);
};

var async = wrap(asyncF(function(msg)
{
  world = log(msg);

  return msg;
}));


world =
  (log(1))
  (async)
  (log(3));

//1
//3
//async process Done!

world = (log(1))
  (bind((async), (log(x))));

//should be
//1
//async process Done!
//3

//in fact
//ReferenceError: x is not defined