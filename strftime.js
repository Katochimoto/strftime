/**
 * User: rikishi
 * Date: 22.06.13
 * Time: 20:53
 *
 * резерв
 * %v %E
 *
 * %-d           нет ведущего пробела или нуля
 * %0d           ведущий ноль
 * %_d           ведущий пробел
 *
 * %a            сокращенное название дня недели, в соответствии с настройками локали
 * %A            полное название дня недели, в соответствии с настройками локали
 * %b            аббревиатура названия месяца, в соответствии с настройками локали
 * %B            полное название месяца, в соответствии с настройками локали
 * %c            предпочитаемое отображение даты и времени, в зависимости от текущей локали
 * %[0-_]C       двухзначный порядковый номер столетия (год, деленный на 100, усеченный до целого)
 * %[0-_]d       двухзначное представление дня месяца (с ведущими нулями)
 * %D            дата в формате MM/DD/YY
 * %[0-_]e       день месяца, с ведущим пробелом, если он состоит из одной цифры
 * %F            дата в формате YYYY-MM-DD
 * %[0-_]g       двухзначный номер года в соответствии со стандартом ISO-8601:1988
 * %G            полная четырехзначная версия %g
 * %h            аббревиатура названия месяца, в соответствии с настройками локали (псевдоним %b)
 * %[0-_]H       двухзначный номер часа в 24-часовом формате
 * %[0-_]I       двухзначный номер часа в 12-часовом формате
 * %[0-_]j       номер дня в году с ведущими нулями
 * %m+           двухзначный порядковый номер месяца (с ведущими нулями)
 * %M+           двухзначный номер минуты (с ведущими нулями)
 * %n            перенос строки
 * %p            'AM' или 'PM' в верхнем регистре, в зависимости от указанного времени
 * %P            'am' или 'pm' в зависимости от указанного времени
 * %r            время в 12 часовом формате - 02:55:02 pm
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
 * %s            метка времени Эпохи Unix с миллисекундами (аналог getTime())
 * %f            аббревиатура названия месяца с точкой, в соответствии с настройками локали
 *
 * Дата и время в предопределенных форматах
 * %Fc           ISO 8601 формат даты и времени: %Y-%m-%dT%H:%M:%S
 * %Fa           ([позавтчера|вчера|сегодня|завтра|послезавтра|%d %Ebl) в %-H:%M
 * %Fb (%Full_Date)           4 ноября 2013 года в 7:04
 * %Fd (%Full_Date_2)         4 ноября 2013 года
 * %Fe (%Full_Date_3)         4 ноября 2013
 * %Ff (%Full_Date_4)         4 ноября, среда
 * %Fg (%Full_Date_5)         Среда, 4 ноября 2013
 *
 * Дата и время с указанием регистра и падежа
 * l             нижний регистр
 * L             верхний регистр
 * C             первая буква в верхнем регистре
 * g             родительный падеж
 *
 * %Ea[lLC][g]   сокращенное название дня недели
 * %EA[lLC][g]   полное название дня недели
 * %Eb[lLC][g]   аббревиатура названия месяца
 * %EB[lLC][g]   полное название месяца
 * %Ef[lLC][g]   аббревиатура названия месяца с точкой
 */
;(function() {
    'use strict';

    var namespace;

    if (typeof module !== 'undefined') {
        namespace = module.exports = strftime;
    } else {
        namespace = (function(){
            return this || (1, eval)('this');
        }());
    }

    namespace.strftime = strftime;

    var localeDate = {
        'a': 'Пн Вт Ср Чт Пт Сб Вс'.split(' '),
        'A': 'Понедельник Вторник Среда Четверг Пятница Суббота Воскресенье'.split(' '),
        'b': 'Янв Фев Мар Апр Май Июн Июл Авг Сен Окт Ноя Дек'.split(' '),
        'B': 'Январь Февраль Март Апрель Май Июнь Июль Август Сентябрь Октябрь Ноябрь Декабрь'.split(' '),
        'f': 'Янв. Фев. Мар. Апр. Май Июн. Июл. Авг. Сен. Окт. Ноя. Дек.'.split(' '),
        'c': '%Y-%m-%d %H:%M:%S',
        'p': 'ДП ПП'.split(' '),
        'P': 'дп пп'.split(' '),
        'r': '%I:%M:%S %p',
        'x': '%m/%d/%y',
        'X': '%H:%M:%S',
        // алиас падежа обязательно указать после обозначения
        'Bg': 'Января Февраля Марта Апреля Мая Июня Июля Августа Сентября Октября Ноября Декабря'.split(' '),
        'bg': 'Янв Фев Мар Апр Мая Июн Июл Авг Сен Окт Ноя Дек'.split(' '),
        'fg': 'Янв. Фев. Мар. Апр. Мая Июн. Июл. Авг. Сен. Окт. Ноя. Дек.'.split(' '),
        // предлог "в"
        'in': 'в',
        'day': 'позавчера вчера сегодня завтра послезавтра'.split(' '),
        'Fb': '%-d %EBlg %Y года в %-H:%M',
        'Fd': '%-d %EBlg %Y года',
        'Fe': '%-d %EBlg %Y',
        'Fg': '%EA, %-d %EBlg %Y',
        'Ff': '%-d %EBlg, %EAl'
    };

    var regAgregat = /%(F[abcdefg]|[cDFhrRTxX])/g;
    var regAgregatSearch = /%(F[abcdefg]|[cDFhrRTxX])/;
    var regSpec = /%(E[aAbBf]([lLC]?)([g]?)|([0\-_]?)[CdegHIjmMSVWyl]|[aAbBGnptuUwYzZsf%])/g;

    var specifiers = {
        'default': {
            'a': function(d) {
                return localeDate.a[specifiers.default.u(d) - 1];
            },
            'A': function(d) {
                return localeDate.A[specifiers.default.u(d) - 1];
            },
            'b': function(d) {
                return localeDate.b[d.getMonth()];
            },
            'f': function(d) {
                return localeDate.f[d.getMonth()];
            },
            'B': function(d) {
                return localeDate.B[d.getMonth()];
            },
            'c': function() {
                return localeDate.c;
            },
            'C': function(d, letterCase, wordCase, numPad) {
                return pad(parseInt(d.getFullYear() / 100, 10), numPad, 0);
            },
            'd': function(d, letterCase, wordCase, numPad) {
                return pad(d.getDate(), numPad, 0);
            },
            'D': function() {
                return '%m/%d/%y';
            },
            'e': function(d, letterCase, wordCase, numPad) {
                return pad(d.getDate(), numPad, ' ');
            },
            'F': function() {
                return '%Y-%m-%d';
            },
            'g': function(d, letterCase, wordCase, numPad) {
                return pad(specifiers.default.G(d) % 100, numPad, 0);
            },
            'G': function(d) {
                var y = d.getFullYear();
                var V = parseInt(specifiers.default.V(d), 10);
                var W = parseInt(specifiers.default.W(d), 10);

                if (W > V) {
                    y++;

                } else if (W === 0 && V >= 52) {
                    y--;
                }

                return y;
            },
            'h': function() {
                return '%b';
            },
            'H': function(d, letterCase, wordCase, numPad) {
                return pad(d.getHours(), numPad, 0);
            },
            'I': function(d, letterCase, wordCase, numPad) {
                var hour = d.getHours() % 12;
                return pad(hour === 0 ? 12 : hour, numPad, 0);
            },
            /**
             * @param {Date} d
             * @param {String} [letterCase]
             * @param {String} [wordCase]
             * @param {String|Number} [numPad]
             * @returns {String|Number}
             */
            'j': function(d, letterCase, wordCase, numPad) {
                var ms = d - new Date('' + d.getFullYear() + '/1/1 GMT');
                ms += d.getTimezoneOffset() * 60000;
                var day = parseInt(ms / 60000 / 60 / 24, 10) + 1;
                return pad(day, numPad, 0, 100);
            },
            'm': function(d, letterCase, wordCase, numPad) {
                return pad(d.getMonth() + 1, numPad, 0);
            },
            'M': function(d, letterCase, wordCase, numPad) {
                return pad(d.getMinutes(), numPad, 0);
            },
            'n': function() {
                return "\n";
            },
            'p': function (d) {
                return localeDate.p[d.getHours() >= 12 ? 1 : 0];
            },
            'P': function (d) {
                return localeDate.P[d.getHours() >= 12 ? 1 : 0];
            },
            'r': function() {
                return localeDate.r;
            },
            'R': function() {
                return '%H:%M';
            },
            'S': function(d, letterCase, wordCase, numPad) {
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
                var day = parseInt(specifiers.default.j(d), 10);
                var rdow = 6 - d.getDay();
                var woy = parseInt((day + rdow) / 7, 10);
                return pad(woy, 0);
            },
            'V': function(d, letterCase, wordCase, numPad) {
                var woy = parseInt(specifiers.default.W(d), 10);
                var dow1_1 = (new Date('' + d.getFullYear() + '/1/1')).getDay();
                var idow = woy + (dow1_1 > 4 || dow1_1 <= 1 ? 0 : 1);
                if (idow === 53 && (new Date('' + d.getFullYear() + '/12/31')).getDay() < 4) {
                    idow = 1;
                } else if (idow === 0) {
                    idow = specifiers.default.V(new Date('' + (d.getFullYear() - 1) + '/12/31'));
                }
                return pad(idow, numPad, 0);
            },
            'w': function(d) {
                return d.getDay();
            },
            'W': function(d, letterCase, wordCase, numPad) {
                var day = parseInt(specifiers.default.j(d), 10);
                var rdow = 7 - specifiers.default.u(d);
                var woy = parseInt((day + rdow) / 7, 10);
                return pad(woy, numPad, 0, 10);
            },
            'x': function() {
                return localeDate.x;
            },
            'X': function() {
                return localeDate.X;
            },
            'y': function(d, letterCase, wordCase, numPad) {
                return pad(d.getFullYear() % 100, numPad, 0);
            },
            'Y': function(d) {
                return d.getFullYear();
            },
            'z': function(d) {
                var o = d.getTimezoneOffset();
                var H = pad(parseInt(Math.abs(o / 60), 10), 0);
                var M = pad(o % 60, 0);
                return (o > 0 ? '-' : '+') + H + M;
            },
            'Z': function(d) {
                return d.toString().replace(/^.*\(([^)]+)\)$/, '$1');
            },
            'l': function(d, letterCase, wordCase, numPad) {
                var l = d.getHours() % 12;
                return pad(l === 0 ? 12 : l, numPad, ' ');
            },
            's': function(d) {
                return d.getTime();
            },
            '%': function() {
                return '%';
            }
        },

        'F': {
            'c': function() {
                return '%Y-%m-%dT%H:%M:%S';
            },
            'a': function(d) {
                var now = new Date();
                var td = d.getTime() + d.getTimezoneOffset() * 60000;
                var time = now.getTime() + now.getTimezoneOffset() * 60000;
                var diff = Math.ceil((td - time) / 60000 / 60 / 24) + 2;
                var day = localeDate.day[diff] || '%d %Ebl';

                return day + ' ' + localeDate.in + ' %-H:%M';
            },
            'b': function() {
                return localeDate.Fb;
            },
            'd': function() {
                return localeDate.Fd;
            },
            'e': function() {
                return localeDate.Fe;
            },
            'f': function() {
                return localeDate.Ff;
            },
            'g': function() {
                return localeDate.Fg;
            }
        },

        'E': {
            'a': function(d, letterCase) {
                return toLetterCase(localeDate.a[specifiers.default.u(d) - 1], letterCase);
            },
            'A': function(d, letterCase) {
                return toLetterCase(localeDate.A[specifiers.default.u(d) - 1], letterCase);
            },
            'b': function(d, letterCase, wordCase) {
                return toLetterCase(localeDate['b' + wordCase][d.getMonth()], letterCase);
            },
            'B': function(d, letterCase, wordCase) {
                return toLetterCase(localeDate['B' + wordCase][d.getMonth()], letterCase);
            },
            'f': function(d, letterCase, wordCase) {
                return toLetterCase(localeDate['f' + wordCase][d.getMonth()], letterCase);
            }
        }
    };

    /**
     * @param {String} format
     * @param {Date|String|Number} [date=Date]
     * @returns {String|Null}
     */
    function strftime(format, date) {
        date = date || new Date();

        switch (typeof(date)) {
            case 'string':
                date = parseInt(date, 10);
            case 'number':
                date = new Date(date);
            case 'object':
                if (!(date instanceof Date) || date === 'Invalid Date') {
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
     * @param {String} [letterCase]
     * @param {String} [wordCase]
     * @param {String} [numPad]
     * @returns {String}
     */
    function formatTransform(_, spec, letterCase, wordCase, numPad) {
        var area = 'default';
        if (spec.length > 1) {
            area = spec.charAt(0);
            area = 'EF'.indexOf(area) !== -1 ? area : 'default';

            spec = spec.charAt(1);
        }

        var s = specifiers[area][spec];

        if (!s) {
            return _;
        }

        return s(formatTransform.date, letterCase, wordCase, numPad);
    }

    /**
     * @param {Number} x
     * @param {String|Number} [pad]
     * @param {String|Number} [def=0]
     * @param {String|Number} [r=10]
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

        for (; parseInt(x, 10) < r && r > 1; r /= 10) {
            x = pad.toString() + x;
        }

        return x.toString();
    }

    /**
     * @param {String} str
     * @param {String|undefined} [letterCase]
     * @returns {String}
     */
    function toLetterCase(str, letterCase) {
        switch (letterCase) {
            case 'l':
                return str.toLowerCase();
            case 'L':
                return str.toUpperCase();
            case 'C':
                return str.substr(0, 1).toUpperCase() + str.substr(1);
            default:
                return str;
        }
    }
}());