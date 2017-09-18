`use strict`

let quadraticEquation = require(`./quadratic-equation`);
let cubicEquation = require(`./cubic-equation`);
let quarticEquation = require(`./quartic-equation`);
let UnifiedAnswer = require(`./unified-answer`);
let isUndefined = require(`./validator`).isUndefined;
let isNumeric = require(`./validator`).isNumeric;

class Mathematics extends UnifiedAnswer {
    quadraticEquation(a, b, c){
        if (isUndefined(a, b, c)) {
            return super.error(1000);
        } else if (!isNumeric(a, b, c)) {
            return super.error(2000);
        } else {
            return super.answer(quadraticEquation(a, b, c));
        }
    }

    cubicEquation(a, b, c, d){
        if (isUndefined(a, b, c, d)) {
            return super.error(1000);
        } else if (!isNumeric(a, b, c, d)) {
            return super.error(2000);
        } else {
            return super.answer(cubicEquation(a, b, c, d));
        }
    }

    quarticEquation(a, b, c, d, e){
        if (isUndefined(a, b, c, d, e)) {
            return super.error(1000);
        } else if (!isNumeric(a, b, c, d, e)) {
            return super.error(2000);
        } else {
            return super.answer(quarticEquation(a, b, c, d, e));
        }
    }
}

module.exports = Mathematics;