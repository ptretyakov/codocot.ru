define(function(require){

/**
 * Форматирование числа.
 * @author Andrey Mishchenko (http://www.msav.ru/)
 * @param val - Значение для форматирования
 * @param thSep - Разделитель разрядов
 * @param dcSep - Десятичный разделитель
 * @returns string
 */

    return function numeric_format(val, thSep, dcSep) {

        // Проверка указания разделителя разрядов
        if (!thSep) thSep = ' ';

        // Проверка указания десятичного разделителя
        if (!dcSep) dcSep = ',';

        var res = val.toString();
        var lZero = (val < 0); // Признак отрицательного числа

        // Определение длины форматируемой части
        var fLen = res.lastIndexOf('.'); // До десятичной точки
        fLen = (fLen > -1) ? fLen : res.length;

        // Выделение временного буфера
        var tmpRes = res.substring(fLen);
        var cnt = -1;
        for (var ind = fLen; ind > 0; ind--) {
            // Формируем временный буфер
            cnt++;
            if (((cnt % 3) === 0) && (ind !== fLen) && (!lZero || (ind > 1))) {
                tmpRes = thSep + tmpRes;
            }
            tmpRes = res.charAt(ind - 1) + tmpRes;
        }

        return tmpRes.replace('.', dcSep);
    }
});

