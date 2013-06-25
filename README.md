strftime
========

### Флаги числовых полей
* __%-d__           нет ведущего пробела или нуля
* __%0d__           ведущий ноль
* __%_d__           ведущий пробел

### Флаги строковых полей
* __%^b__           верхний регистр
* __%#B__           нижний регистр

### Спецификаторы
* __%[^#]a__        сокращенное название дня недели, в соответствии с настройками локали
* __%[^#]A__        полное название дня недели, в соответствии с настройками локали
* __%[^#]b__        аббревиатура названия месяца, в соответствии с настройками локали
* __%[^#]B__        полное название месяца, в соответствии с настройками локали
* __%[^#]f__        аббревиатура названия месяца с точкой, в соответствии с настройками локали
* __%[^#]v__        [позавтчера|вчера|сегодня|завтра|послезавтра|__%d__ __%#b__)
* __%c__            предпочитаемое отображение даты и времени, в зависимости от текущей локали
* __%[0-_]C__       двухзначный порядковый номер столетия (год, деленный на 100, усеченный до целого)
* __%[0-_]d__       двухзначное представление дня месяца (с ведущими нулями)
* __%D__            дата в формате MM/DD/YY
* __%[0-_]e__       день месяца, с ведущим пробелом, если он состоит из одной цифры
* __%F__            дата в формате YYYY-MM-DD
* __%[0-_]g__       двухзначный номер года в соответствии со стандартом ISO-8601:1988
* __%G__            полная четырехзначная версия __%g__
* __%h__            аббревиатура названия месяца, в соответствии с настройками локали (псевдоним __%b__)
* __%[0-_]H__       двухзначный номер часа в 24-часовом формате
* __%[0-_]I__       двухзначный номер часа в 12-часовом формате
* __%[0-_]j__       номер дня в году с ведущими нулями
* __%m__            двухзначный порядковый номер месяца (с ведущими нулями)
* __%M__            двухзначный номер минуты (с ведущими нулями)
* __%n__            перенос строки
* __%p__            'AM' или 'PM' в верхнем регистре, в зависимости от указанного времени
* __%P__            'am' или 'pm' в зависимости от указанного времени
* __%r__            время в 12 часовом формате - 02:55:02 pm
* __%R__            время в 24 часовом формате HH:MM
* __%[0-_]S__       двухзначный номер секунды (с ведущими нулями)
* __%t__            табуляция
* __%T__            ISO 8601 формат времени HH:MM:SS
* __%[0-_]V__       порядковый номер недели в указанном году в соответствии со стандартом ISO-8601:1988,
                счет начинается с той недели, которая содержит минимум 4 дня, неделя начинается с понедельника.
                От 01 до 53 (где 53 указывает на перекрывающуюся неделю)
* __%[0-_]W__       порядковый номер недели в указанном году, начиная с первого понедельника в качестве первой недели.
                От 00 до 53
* __%w__            день недели, с вс - 0
* __%x__            предпочитаемое отображение даты, без времени
* __%X__            предпочитаемое отображение времени в зависимости от локали, без даты
* __%[0-_]y__       последние 2 цифры года
* __%Y__            год
* __%u__            порядковый номер дня недели согласно стандарту ISO-8601 (с 1 - пн. по 7 - вс.)
* __%U__            порядковый номер недели в указанном году, начиная с первого воскресенья в качестве первой недели
* __%[0-_]l__       час в 12-часовом формате, с пробелом перед одиночной цифрой
* __%z__            смещение временной зоны относительно UTC (пример -0500)
* __%Z__            аббревиатура временной зоны относительно UTC
* __%s__            метка времени Эпохи Unix (аналог getTime() без миллисек.)

### Дата и время в предопределенных форматах
* __%Date_iso__                ISO 8601 формат даты и времени: __%Y-%m-%dT%H:%M:%S__
* __%Date_dBY_year_in_HM__     4 ноября 2013 года в 7:04 (Full_Date)
* __%Date_dBY_year__           4 ноября 2013 года (Full_Date_2)
* __%Date_dBY__                4 ноября 2013 (Full_Date_3)
* __%Date_dBA__                4 ноября, среда (Full_Date_4)
* __%Date_AdBY__               Среда, 4 ноября 2013 (Full_Date_5)
* __%Date_df_in_HM__           4 ноя. в 12:36 (Short_Date_5)
* __%Date_dfY__                4 ноя. 2013 (Short_Date_4)
* __%Date_dB_in_HM__           11 ноября в 12:36 (Short_Date_6)
* __%Date_dmY__                04.05.2013 (Short_Date_3)
* __%Date_df__                 21 окт. (Short_Date_2)
