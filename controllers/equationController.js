`use strict`

const Mathematics = require(`../app_modules/mathematics`);
let mathematics = new Mathematics;

module.exports.quadraticEquation = function(req, res) {
    let query = req.query;
    if(Object.keys(query).length) {
        let a = query.a;
        let b = query.b;
        let c = query.c;

        res.json(mathematics.quadraticEquation(a, b, c));
    } else {
        res.json(mathematics.error(1000));
    }
};

module.exports.cubicEquation = function(req, res) {
    let query = req.query;
    if(Object.keys(query).length) {
        let a = query.a;
        let b = query.b;
        let c = query.c;
        let d = query.d;

        res.json(mathematics.cubicEquation(a, b, c, d));
    } else {
        res.json(mathematics.error(1000));
    }
};

module.exports.quarticEquation = function(req, res) {
    let query = req.query;
    if(Object.keys(query).length) {
        let a = query.a;
        let b = query.b;
        let c = query.c;
        let d = query.d;
        let e = query.e;

        res.json(mathematics.quarticEquation(a, b, c, d, e));
    } else {
        res.json(mathematics.error(1000));
    }
};