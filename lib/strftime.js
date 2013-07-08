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
var strftime = function(format, date) {
    date = date || new Date();

    switch (typeof(date)) {
        case 'string':
            date = +date;
            /* jshint -W086 */
        case 'number':
            date = new Date(date);
            /* jshint -W086 */
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

    return strftime.format(format, date);
};
