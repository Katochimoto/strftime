/**
 * User: rikishi
 * Date: 22.06.13
 * Time: 20:53
 *
 * резерв
 * %E
 *
 * %-d           нет ведущего пробела или нуля
 * %0d           ведущий ноль
 * %_d           ведущий пробел
 *
 * %^b           верхний регистр
 * %#B           нижний регистр
 * %!B           название всегда в ИП
 * %~B           название всегда в РП
 *
 * %[^#]a        сокращенное название дня недели, в соответствии с настройками локали
 * %[^#]A        полное название дня недели, в соответствии с настройками локали
 * %[^#!~]b      аббревиатура названия месяца, в соответствии с настройками локали
 * %[^#!~]h      аббревиатура названия месяца, в соответствии с настройками локали (псевдоним %b)
 * %[^#!~]B      полное название месяца, в соответствии с настройками локали
 * %[^#!~]f      аббревиатура названия месяца с точкой, в соответствии с настройками локали
 * %[^#]v        [позавтчера|вчера|сегодня|завтра|послезавтра|%d %#b)
 * %c            предпочитаемое отображение даты и времени, в зависимости от текущей локали
 * %[0-_]C       двухзначный порядковый номер столетия (год, деленный на 100, усеченный до целого)
 * %[0-_]d       двухзначное представление дня месяца (с ведущими нулями)
 * %D            дата в формате MM/DD/YY
 * %[0-_]e       день месяца, с ведущим пробелом, если он состоит из одной цифры
 * %F            дата в формате YYYY-MM-DD
 * %[0-_]g       двухзначный номер года в соответствии со стандартом ISO-8601:1988
 * %G            полная четырехзначная версия %g
 * %[0-_]H       двухзначный номер часа в 24-часовом формате
 * %[0-_]I       двухзначный номер часа в 12-часовом формате
 * %[0-_]j       номер дня в году с ведущими нулями
 * %m            двухзначный порядковый номер месяца (с ведущими нулями)
 * %M            двухзначный номер минуты (с ведущими нулями)
 * %n            перенос строки
 * %p            'AM' или 'PM' в верхнем регистре, в зависимости от указанного времени
 * %P            'am' или 'pm' в зависимости от указанного времени
 * %r            время в 12 часовом формате - 02:55:02 PM
 * %R            время в 24 часовом формате HH:MM
 * %[0-_]S       двухзначный номер секунды (с ведущими нулями)
 * %t            табуляция
 * %T            ISO 8601 формат времени HH:MM:SS
 * %[0-_]V       порядковый номер недели в указанном году в соответствии со стандартом ISO-8601:1988,
 *               счет начинается с той недели, которая содержит минимум 4 дня, неделя начинается с понедельника.
 *               От 01 до 53 (где 53 указывает на перекрывающуюся неделю)
 * %[0-_]W       порядковый номер недели в указанном году, начиная с первого понедельника в качестве первой недели.
 *               От 00 до 53
 * %w            день недели, с вс - 0
 * %x            предпочитаемое отображение даты, без времени
 * %X            предпочитаемое отображение времени в зависимости от локали, без даты
 * %[0-_]y       последние 2 цифры года
 * %Y            год
 * %u            порядковый номер дня недели согласно стандарту ISO-8601 (с 1 - пн. по 7 - вс.)
 * %U            порядковый номер недели в указанном году, начиная с первого воскресенья в качестве первой недели
 * %[0-_]l       час в 12-часовом формате, с пробелом перед одиночной цифрой
 * %z            смещение временной зоны относительно UTC (пример -0500)
 * %Z            аббревиатура временной зоны относительно UTC
 * %s            метка времени Эпохи Unix (аналог getTime() без миллисек.)
 *
 * Дата и время в предопределенных форматах
 * %Date_iso                ISO 8601 формат даты и времени: %Y-%m-%dT%H:%M:%S
 * %Date_dBY_year_in_HM     4 ноября 2013 года в 7:04 (Full_Date)
 * %Date_dBY_year           4 ноября 2013 года (Full_Date_2)
 * %Date_dBY                4 ноября 2013 (Full_Date_3)
 * %Date_dBA                4 ноября, среда (Full_Date_4)
 * %Date_AdBY               Среда, 4 ноября 2013 (Full_Date_5)
 * %Date_df_in_HM           4 ноя. в 12:36 (Short_Date_5)
 * %Date_dfY                4 ноя. 2013 (Short_Date_4)
 * %Date_dB_in_HM           11 ноября в 12:36 (Short_Date_6)
 * %Date_dmY__dot           04.05.2013 (Short_Date_3)
 * %Date_df                 21 окт. (Short_Date_2)
 * %Date_FT                 2013-07-01 12:43:01
 * %Date_dmY__minus         01-07-2013
 */
(function() {
    'use strict';

    var locale = include('strftime.json');

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
     * Форматированный вывод даты.
     *
     * Варианты указания даты:
     * String - приведение к double timestamp и создание объекта Date
     * Number - создание объекта Date
     * Date - без преобразований
     * Object - предполагает передачу объекта {year:, month:, day:, hours:, minutes:, seconds:, ms:}, свойства не обязательны
     * Array - предполагает передачу псевдо-объекта из yate, с доступом к данным через jpath(date, '.data')[0]
     *
     * @param {String} format
     * @param {Date|String|Number|Object|Array} [date=Date]
     * @returns {String|Null}
     */
    function strftime(format, date) {
        date = date || new Date();

        switch (typeof(date)) {
            case 'string':
                date = +date;
            case 'number':
                date = new Date(date);
            case 'object':
                // для подстановки объекта из yate
                if (date instanceof Array) {
                    date = jpath(date, '.data')[0];
                }

                var type = Object.prototype.toString.call(date);
                if (type === '[object Object]') {
                    date = new Date(date.year|0, date.month|0, date.day|0, date.hours|0, date.minutes|0, date.seconds|0, date.ms|0);
                }

                if (!(date instanceof Date) || date == 'Invalid Date') {
                    return null;
                }
        }

        formatTransform.date = date;

        var loop = 5;
        while (format.match(regAgregatSearch) && loop) {
            format = format.replace(regAgregat, formatTransform);
            loop--;
        }

        return format.replace(regSpec, formatTransform);
    }

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
        if (mod.indexOf('!') === -1
            && spec.length === 1
            && (mod.indexOf('~') > -1 || ('bBf'.indexOf(spec) > -1 && /%[0\-_]?d[\s]+$/.test(str.substr(0, pos))))) {

            genitive = true;
        }

        return s(formatTransform.date, mod, numPad, genitive);
    }

    /**
     * @param {Number} x
     * @param {String|Number|undefined} [pad]
     * @param {String|Number|undefined} [def=0]
     * @param {String|Number|undefined} [r=10]
     * @returns {String|Number}
     */
    function pad(x, pad, def, r) {
        if (pad === '-') {
            return x;
        }

        if (pad === '_') {
            pad = ' ';
        }

        if (typeof def === 'undefined') {
            def = 0;
        }

        if (typeof r === 'undefined') {
            r = 10;
        }

        if (typeof pad === 'undefined' || pad === '') {
            pad = def;
        }

        for (; r > x|0 && r > 1; r /= 10) {
            x = pad.toString() + x;
        }

        return x.toString();
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

    function include() {
        return {
            'a': ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
            'A': ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
            'b': ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
            'B': ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
            'f': ['Jan.', 'Feb.', 'Mar.', 'Apr.', 'May', 'Jun.', 'Jul.', 'Aug.', 'Sep.', 'Oct.', 'Nov.', 'Dec.'],
            'c': '%Y-%m-%d %H:%M:%S',
            'P': ['am', 'pm'],
            'r': '%I:%M:%S %p',
            'x': '%m/%d/%y',
            'X': '%H:%M:%S',
            'day': ['Yesterday', 'Today', 'Tomorrow'],

            // алиас падежа обязательно указать после обозначения
            'bg': ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
            'Bg': ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
            'fg': ['Jan.', 'Feb.', 'Mar.', 'Apr.', 'May', 'Jun.', 'Jul.', 'Aug.', 'Sep.', 'Oct.', 'Nov.', 'Dec.'],

            'Date_dBY_year_in_HM': '%#B %-d, %Y at %-H:%M',
            'Date_dBY_year': '%#B %-d, %Y',
            'Date_dBY': '%#B %-d, %Y',
            'Date_AdBY': '%A, %#B %-d, %Y',
            'Date_dBA': '%#B %-d, %A',
            'Date_df_in_HM': '%#f, %-d at %-H:%M',
            'Date_dfY': '%-d %#f %Y',
            'Date_dB_in_HM': '%#B %-d at %-H:%M',
            'Date_df': '%-d %#f'
        };
    }

    return strftime;
}());