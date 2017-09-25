`use strict`

let quadraticEquation = require(`./quadratic-equation`);
let cubicEquation = require(`./cubic-equation`);
let quarticEquation = require(`./quartic-equation`);
let UnifiedAnswer = require(`./unified-answer`);
let isUndefined = require(`./validator`).isUndefined;
let isNumeric = require(`./validator`).isNumeric;
let hasNumericArrays = require(`./validator`).hasNumericArrays;
let hasEqualLengthArrays = require(`./validator`).hasEqualLengthArrays;
let isVectorSpace = require(`./vectors-space-axioms`);

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

    isVectorSpace(vectors){
        if (isUndefined(vectors)) {
            return super.error(5000);
        } else if(!hasNumericArrays(vectors)) {
            return super.error(3000);
        } else if(!hasEqualLengthArrays(vectors)){
            return super.error(4000);
        } else {
            return super.answer(isVectorSpace(vectors));
        }
    }
}

module.exports = Mathematics;