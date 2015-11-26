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
    var newDate = date;

    if (typeof newDate === 'undefined') {
        newDate = new Date();
    }

    if (typeof newDate === 'number') {
        newDate = new Date(newDate);
    }

    if (!(newDate instanceof Date) || String(newDate) === 'Invalid Date') {
        return null;
    }

    if (utc) {
        newDate = new Date(newDate.getTime() + newDate.getTimezoneOffset() * 60000);
    }

    return strftime.format(format, newDate, localeName);
};
