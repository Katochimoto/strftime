/**
 * User: rikishi
 * Date: 22.06.13
 * Time: 21:11
 *
 */
var util = require('util');
var strftime = require('../strftime');


var str = strftime('asd %s asd', new Date());

console.log(str);