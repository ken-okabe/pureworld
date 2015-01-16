/* jshint node: true */
/* jshint sub: true */
/* global window,document, $,alert,history */

"use strict";

require('./app');

log("1")(); // :: b
log("1")(log("2"))(); // :: IO c

world = (log("1"))(log("2"))(log("3"))(log("4"));



// 1
// 2
// 3
// 4