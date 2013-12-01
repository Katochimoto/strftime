/**
 * Форматированный вывод даты.
 *
 * Варианты указания даты:<br>
 * Number - создание объекта Date<br>
 * Date - без преобразований
 *
 * @namespace strftime
 * @param {String} format
 * @param {Date|Number} [date=Date]
 * @param {Boolean} [utc]
 * @param {String} [localeName]
 * @return {String|Null}
 */
/*jshint -W079 */
var strftime = function(format, date, utc, localeName) {
    if (typeof date === 'undefined') {
        date = new Date();
    }

    if (typeof date === 'number') {
        date = new Date(date);
    }

    if (!(date instanceof Date) || String(date) === 'Invalid Date') {
        return null;
    }

    if (utc) {
        date.setTime(date.getTime() + date.getTimezoneOffset() * 60000);
    }

    return strftime.format(format, date, localeName);
};
