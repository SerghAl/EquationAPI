`use strict`

function validateInputNumbers(){
    for(let i = 0; i < arguments.length; i++){
        let n = arguments[i];
        if(isNaN(parseFloat(n)) || !isFinite(n)){
            return false;
        }
    }
    return true;
}

module.exports = validateInputNumbers;