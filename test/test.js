/**
 * User: rikishi
 * Date: 22.06.13
 * Time: 21:11
 *
 */
var util = require('util');
var strftime = require('../strftime');


var str = strftime('asd %Date_dBY_year_in_HM asd', new Date(2013,5,10));

console.log(str);