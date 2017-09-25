`use strict`

function checkVectorsThroughAxioms(vectors){
    if(vectors.length > 1) {
        let vectorsToCheck = copyVector(vectors);
        while(vectorsToCheck.length > 1) {
            let vector1 = vectorsToCheck[0];

            for(let i = 1; i < vectorsToCheck.length; i++){
                let vector2 = vectorsToCheck[i];

                if(!axiom1(vector1, vector2) && !axiom8(vector1, vector2)){
                    return false;
                }
            }
            vectorsToCheck.shift();
        }
    }

    if(vectors.length > 2){
        let vectorsToCheck = copyVector(vectors);
        while(vectorsToCheck.length > 2) {
            let vector1 = vectorsToCheck[0];
            let vector2 = vectorsToCheck[1];

            for(let i = 2; i < vectorsToCheck.length; i++){
                let vector3 = vectorsToCheck[i];

                if(!axiom2(vector1, vector2, vector3)){
                    return false;
                }
            }
            vectorsToCheck.shift();
        }
    }

    for(let vector of vectors){
        if(!axiom3(vector) && !axiom4(vector) && !axiom5(vector) && !axiom6(vector) && !axiom7(vector)){
            return false;
        }
    }

    return true;
}

// аксиома 1 - коммутативность сложения: X + Y = Y + X
function axiom1(X, Y){
    let vector1 = sumTwoVectors(X, Y);
    let vector2 = sumTwoVectors(Y, X);

    return compareVectors(vector1, vector2);
}

// аксиома 2 - ассоциативность сложения: X + (Y + Z) = (X + Y) + Z
function axiom2(X, Y, Z){
    let vector1 = sumTwoVectors(X, sumTwoVectors(Y, Z));
    let vector2 = sumTwoVectors(sumTwoVectors(X, Y), Z);

    return compareVectors(vector1, vector2);
}

// аксиома 3 - существование нейтрального элемента относительно сложения: X + 0 = X
function axiom3(X){
    let vector1 = sumTwoVectors(X, createNullVectorByLength(X));
    let vector2 = X;

    return compareVectors(vector1, vector2);
}

// аксиома 4 - существование противоположного вектора, приводящего исходный к нулю: X + -X = 0
function axiom4(X){
    let vector1 = sumTwoVectors(X, multiplyVectorOnScalar(-1, X));
    let vector2 = createNullVectorByLength(X);

    return compareVectors(vector1, vector2);
}

// аксиома 5 - ассоциативность умножения на скаляр: a(bX) = (ab)X
function axiom5(X){
    let a = 3;
    let b = 2;

    let vector1 = multiplyVectorOnScalar(a, multiplyVectorOnScalar(b, X));
    let vector2 = multiplyVectorOnScalar(a * b, X);

    return compareVectors(vector1, vector2);
}

// аксиома 6 - унитарность, умножение на нейтральный (по умножению) элемент поля F сохраняет вектор: 1*X = X
function axiom6(X){
    let vector1 = multiplyVectorOnScalar(1, X);
    let vector2 = X;

    return compareVectors(vector1, vector2);
}

// аксиома 7 - дистрибутивность умножения вектора на скаляр относительно сложения скаляров: (a + b)X = aX + bX
function axiom7(X) {
    let a = 3;
    let b = 2;

    let vector1 = multiplyVectorOnScalar((a + b), X);
    let vector2 = sumTwoVectors(multiplyVectorOnScalar(a, X), multiplyVectorOnScalar(b, X));

    return compareVectors(vector1, vector2);
}

// аксиома 8 - дистрибутивность умножения вектора на скаляр относительно сложения векторов a(X + Y) = aX + aY
function axiom8(X, Y) {
    let a = 3;

    let vector1 = multiplyVectorOnScalar(a, sumTwoVectors(X, Y));
    let vector2 = sumTwoVectors(multiplyVectorOnScalar(a, X), multiplyVectorOnScalar(a, Y));

    return compareVectors(vector1, vector2);
}


function sumTwoVectors(vector1, vector2){
    let sumOfVectors = [];
    for(let i = 0; i < vector1.length; i ++){
        sumOfVectors[i] = vector1[i] + vector2[i];
    }
    return sumOfVectors;
}

function multiplyVectorOnScalar(vector, scalar){
    let newVector = [];
    for(let i = 0; i < vector.length; i ++){
        newVector[i] = vector[i] * scalar;
    }
    return newVector;
}

function compareVectors(vector1, vector2){
    for(let i = 0; i < vector1.length; i ++){
        if(vector1[i] !== vector2[i]){
            return false;
        }
    }
    return true;
}

function createNullVectorByLength(vector){
    let nullVector = [];
    for(let i = 0; i < vector.length; i ++){
        nullVector.push(0);
    }
    return nullVector;
}

function copyVector(vector){
    let copyVector = [];
    for(let i = 0; i < vector.length; i ++){
        copyVector.push(vector[i]);
    }
    return copyVector;
}

module.exports = checkVectorsThroughAxioms;