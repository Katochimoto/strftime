(function(strftime) {

    var locale = strftime.locale;
    var regAgregat = /%(Date_[a-zA-Z0-9_]+|([#\^]?)[v]|[cDFrRTxX])/g;
    var regAgregatSearch = /%(Date_[a-zA-Z0-9_]+|[#\^]?[v]|[cDFrRTxX])/;
    var regSpec = /%(([#\^!~]{0,2})[aAbBfh]|([0\-_]?)[CdegHIjmMSVWyl]|[GnpPtuUwYzZs%])/g;

    var specifiers = {
        'a': function(d, mode) {
            return toLetterCase(locale.a[d.getDay()], mode);
        },
        'A': function(d, mode) {
            return toLetterCase(locale.A[d.getDay()], mode);
        },
        'b': function(d, mode, numPad, genitive) {
            return toLetterCase(locale[genitive ? 'bg' : 'b'][d.getMonth()], mode);
        },
        'h': function(d, mode, numPad, genitive) {
            return specifiers.b(d, mode, numPad, genitive);
        },
        'f': function(d, mode, numPad, genitive) {
            return toLetterCase(locale[genitive ? 'fg' : 'f'][d.getMonth()], mode);
        },
        'B': function(d, mode, numPad, genitive) {
            return toLetterCase(locale[genitive ? 'Bg' : 'B'][d.getMonth()], mode);
        },
        'c': function() {
            return locale.c;
        },
        'C': function(d, mode, numPad) {
            return pad(d.getFullYear() / 100|0, numPad, 0);
        },
        'd': function(d, mode, numPad) {
            return pad(d.getDate(), numPad, 0);
        },
        'D': function() {
            return '%m/%d/%y';
        },
        'e': function(d, mode, numPad) {
            return pad(d.getDate(), numPad, ' ');
        },
        'F': function() {
            return '%Y-%m-%d';
        },
        'g': function(d, mode, numPad) {
            return pad(specifiers.G(d) % 100, numPad, 0);
        },
        'G': function(d) {
            var y = d.getFullYear()|0;
            var V = specifiers.V(d)|0;
            var W = specifiers.W(d)|0;

            if (W > V) {
                y++;

            } else if (W === 0 && V >= 52) {
                y--;
            }

            return y;
        },
        'H': function(d, mode, numPad) {
            return pad(d.getHours(), numPad, 0);
        },
        'I': function(d, mode, numPad) {
            var hour = d.getHours() % 12;
            return pad(hour === 0 ? 12 : hour, numPad, 0);
        },
        /**
         * @param {Date} d
         * @param {String} [mode]
         * @param {String|Number} [numPad]
         * @returns {String|Number}
         */
        'j': function(d, mode, numPad) {
            var ms = d - new Date('' + d.getFullYear() + '/1/1 GMT');
            ms += d.getTimezoneOffset() * 60000;
            var day = 1 + ms / 60000 / 60 / 24|0;
            return pad(day, numPad, 0, 100);
        },
        'm': function(d, mode, numPad) {
            return pad(d.getMonth() + 1, numPad, 0);
        },
        'M': function(d, mode, numPad) {
            return pad(d.getMinutes(), numPad, 0);
        },
        'n': function() {
            return "\n";
        },
        'p': function (d) {
            var p = d.getHours() >= 12 ? 1 : 0;
            return ('' + locale.P[p]).toUpperCase();
        },
        'P': function (d) {
            var p = d.getHours() >= 12 ? 1 : 0;
            return '' + locale.P[p];
        },
        'r': function() {
            return locale.r;
        },
        'R': function() {
            return '%H:%M';
        },
        'S': function(d, mode, numPad) {
            return pad(d.getSeconds(), numPad, 0);
        },
        't': function() {
            return "\t";
        },
        'T': function() {
            return '%H:%M:%S';
        },
        'u': function(d) {
            var day = d.getDay();
            return day === 0 ? 7 : day;
        },
        'U': function(d) {
            var day = specifiers.j(d)|0;
            var rdow = 6 - d.getDay();
            var woy = (day + rdow) / 7|0;
            return pad(woy, 0);
        },
        'V': function(d, mode, numPad) {
            var woy = specifiers.W(d)|0;
            var dow1_1 = (new Date('' + d.getFullYear() + '/1/1')).getDay();
            var idow = woy + (dow1_1 > 4 || dow1_1 <= 1 ? 0 : 1);
            if (idow === 53 && (new Date('' + d.getFullYear() + '/12/31')).getDay() < 4) {
                idow = 1;
            } else if (idow === 0) {
                idow = specifiers.V(new Date('' + (d.getFullYear() - 1) + '/12/31'));
            }
            return pad(idow, numPad, 0);
        },
        'w': function(d) {
            return d.getDay();
        },
        'W': function(d, mode, numPad) {
            var day = specifiers.j(d)|0;
            var rdow = 7 - specifiers.u(d)|0;
            var woy = (day + rdow) / 7|0;
            return pad(woy, numPad, 0, 10);
        },
        'x': function() {
            return locale.x;
        },
        'X': function() {
            return locale.X;
        },
        'y': function(d, mode, numPad) {
            return pad(d.getFullYear() % 100, numPad, 0);
        },
        'Y': function(d) {
            return d.getFullYear();
        },
        'z': function(d) {
            var o = d.getTimezoneOffset();
            var H = pad(Math.abs(o / 60)|0, 0);
            var M = pad(o % 60, 0);
            return (o > 0 ? '-' : '+') + H + M;
        },
        'Z': function(d) {
            return d.toString().replace(/^.*\(([^)]+)\)$/, '$1');
        },
        'l': function(d, mode, numPad) {
            var l = d.getHours() % 12;
            return pad(l === 0 ? 12 : l, numPad, ' ');
        },
        's': function(d) {
            return (d.getTime() / 1000)|0;
        },
        '%': function() {
            return '%';
        },
        'v': function(d, mode) {
            var now = new Date();
            var td = d.getTime() + d.getTimezoneOffset() * 60000;
            var time = now.getTime() + now.getTimezoneOffset() * 60000;
            var diff = Math.ceil((td - time) / 60000 / 60 / 24) + 1;

            if (locale.day[diff]) {
                return toLetterCase(locale.day[diff], mode);

            } else {
                return '%d %' + mode + 'B';
            }
        },

        'Date_iso': function() {
            return '%Y-%m-%dT%H:%M:%S';
        },
        'Date_dBY_year_in_HM': function() {
            return locale.Date_dBY_year_in_HM;
        },
        'Date_dBY_year': function() {
            return locale.Date_dBY_year;
        },
        'Date_dBY': function() {
            return locale.Date_dBY;
        },
        'Date_dBA': function() {
            return locale.Date_dBA;
        },
        'Date_AdBY': function() {
            return locale.Date_AdBY;
        },
        'Date_df_in_HM': function() {
            return locale.Date_df_in_HM;
        },
        'Date_dfY': function() {
            return locale.Date_dfY;
        },
        'Date_dB_in_HM': function() {
            return locale.Date_dB_in_HM;
        },
        'Date_dmY__dot': function() {
            return '%d.%m.%Y';
        },
        'Date_df': function() {
            return locale.Date_df;
        },
        'Date_FT': function() {
            return '%F %T';
        },
        'Date_dmY__minus': function() {
            return '%d-%m-%Y';
        }
    };

    /**
     * @param {String} format
     * @param {Date} date
     * @returns {String}
     */
    strftime.format = function(format, date) {
        formatTransform.date = date;

        var loop = 5;
        while (regAgregatSearch.test(format) && loop) {
            format = format.replace(regAgregat, formatTransform);
            loop--;
        }

        return format.replace(regSpec, formatTransform);
    };

    /**
     * @param {String} _
     * @param {String} spec
     * @param {String|undefined} [numPad]
     * @param {String} [mod]
     * @param {Number} [pos]
     * @param {String} [str]
     * @returns {String}
     */
    function formatTransform(_, spec, mod, numPad, pos, str) {
        spec = '' + spec;
        mod = '' + mod;

        spec = spec.replace(/^[#_0\^\-!~]+/, '');
        var s = specifiers[spec];

        if (!s) {
            return _;
        }

        var genitive = false;
        if (mod.indexOf('!') === -1 && spec.length === 1 && (mod.indexOf('~') > -1 || ('bBf'.indexOf(spec) > -1 && /%[0\-_]?d[\s]+$/.test(str.substr(0, pos))))) {

            genitive = true;
        }

        return s(formatTransform.date, mod, numPad, genitive);
    }

    /**
     * @param {Number} aData
     * @param {String|Number|undefined} [aPad]
     * @param {String|Number|undefined} [aDef=0]
     * @param {String|Number|undefined} [aRate=10]
     * @returns {String|Number}
     */
    function pad(aData, aPad, aDef, aRate) {
        if (aPad === '-') {
            return aData;
        }

        if (aPad === '_') {
            aPad = ' ';
        }

        if (typeof aDef === 'undefined') {
            aDef = 0;
        }

        if (typeof aRate === 'undefined') {
            aRate = 10;
        }

        if (typeof aPad === 'undefined' || aPad === '') {
            aPad = aDef;
        }

        for (; aRate > aData|0 && aRate > 1; aRate /= 10) {
            aData = aPad.toString() + aData;
        }

        return aData.toString();
    }

    /**
     * @param {String} str
     * @param {String} [mode]
     * @returns {String}
     */
    function toLetterCase(str, mode) {
        str = '' + str;
        mode = '' + mode;

        if (mode.indexOf('#') > -1) {
            return str.toLowerCase();
        }

        if (mode.indexOf('^') > -1) {
            return str.toUpperCase();
        }

        return str.substr(0, 1).toUpperCase() + str.substr(1);
    }


}(strftime));
