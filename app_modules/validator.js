`use strict`

module.exports.isNumeric = function (){
    for(let i = 0; i < arguments.length; i++){
        let n = arguments[i];
        if(isNaN(parseFloat(n)) || !isFinite(n)){
            return false;
        }
    }
    return true;
};

module.exports.isUndefined = function(){
    for(let i = 0; i < arguments.length; i++){
        let n = arguments[i];
        if(n === undefined){
            return true;
        }
    }
    return false;
};