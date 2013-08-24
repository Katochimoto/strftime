/**
 * Форматированный вывод даты.
 *
 * Варианты указания даты:
 * Number - создание объекта Date
 * Date - без преобразований
 *
 * @param {String} format
 * @param {Date|Number} [date=Date]
 * @returns {String|Null}
 */
/*jshint -W079 */
var strftime = function(format, date) {
    if (typeof date === 'undefined') {
        date = new Date();
    }

    if (typeof date === 'number') {
        date = new Date(date);
    }

    if (!(date instanceof Date) || String(date) === 'Invalid Date') {
        return null;
    }

    return strftime.format(format, date);
};
