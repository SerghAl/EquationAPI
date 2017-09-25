`use strict`

const ERROR = {
    1000: `Не переданы параметры уравнения `,
    2000: `Попытка ввода неизвестных параметров`,
    3000: `Один из векторов содержит нечисловые значения`,
    4000: `Переданные векторы имеют разную размерность`,
    5000: `Не переданы векторы для проверки векторного пространства`,
    9000: `Неизвестная ошибка`
};

class UnifiedAnswer {

    answer(data) {
        return {
            result: `ok`,
            data: data,
        };
    };

    error(code) {
        let error = (code && ERROR[code]) ? { code: code, message: ERROR[code] } : { code: 3000, message: ERROR[3000] } ;
        return {
            result: `error`,
            error: error
        };
    };
}

module.exports = UnifiedAnswer;