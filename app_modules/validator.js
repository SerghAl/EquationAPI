`use strict`

function isNumeric(){
    for(let i = 0; i < arguments.length; i++){
        let n = arguments[i];
        if(isNaN(parseFloat(n)) || !isFinite(n)){
            return false;
        }
    }
    return true;
}

function isUndefined(){
    for(let i = 0; i < arguments.length; i++){
        let n = arguments[i];
        if(n === undefined){
            return true;
        }
    }
    return false;
}

function hasNumericArrays(mainArr){
    for(let arr of mainArr){
        for(let item of arr){
            if(!isNumeric(item)){
                return false;
            }
        }
    }
    return true;
}

function hasEqualLengthArrays(mainArr){
    for(let arr of mainArr){
        if(arr.length !== mainArr[mainArr.length - 1].length){
            return false;
        }
    }
    return true;
}

module.exports.isNumeric = isNumeric;
module.exports.isUndefined = isUndefined;
module.exports.hasNumericArrays = hasNumericArrays;
module.exports.hasEqualLengthArrays = hasEqualLengthArrays;