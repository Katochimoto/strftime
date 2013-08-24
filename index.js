/* jshint -W067 */
(function() {
    'use strict';

    require('lib/strftime.js');

    strftime.version = '0.0.1';

    var namespace;

    if (typeof module !== 'undefined') {
        namespace = module.exports = strftime;
    } else {
        namespace = (function() {
            return this || (1, eval)('this');
        }());
    }

    namespace.strftime = strftime;

    require('lib/locale.js');
    require('lib/util.js');

}());
