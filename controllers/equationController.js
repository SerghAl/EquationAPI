const quadraticEquation = require(`../app_modules/quadratic-equation`);
const cubicEquation = require(`../app_modules/cubic-equation`);
const isNumeric = require(`../app_modules/validator`);

module.exports.quadraticEquation = function(req, res) {
    let query = req.query;
    if(Object.keys(query).length) {
        let a = isNumeric(query.a) ? query.a : null;
        let b = isNumeric(query.b) ? query.b : null;
        let c = isNumeric(query.c) ? query.c : null;

        if (!isNumeric(a, b, c)) {
            res.status(400);
            res.send(`Попытка ввода неизвестных параметров`);
        } else {
            let result = quadraticEquation(a, b, c);
            res.json(result);
        }
    } else {
        res.status(400);
        res.send(`Не переданы параметры уравнения`);
    }
};

module.exports.cubicEquation = function(req, res) {
    let query = req.query;
    if(Object.keys(query).length) {
        let a = isNumeric(query.a) ? query.a : null;
        let b = isNumeric(query.b) ? query.b : null;
        let c = isNumeric(query.c) ? query.c : null;
        let d = isNumeric(query.d) ? query.d : null;

        if (!isNumeric(a, b, c)) {
            res.status(400);
            res.send(`Попытка ввода неизвестных параметров`);
        } else {
            let result = cubicEquation(a, b, c, d);
            res.json(result);
        }
    } else {
        res.status(400);
        res.send(`Не переданы параметры уравнения`);
    }
};