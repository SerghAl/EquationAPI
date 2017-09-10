`use strict`

function computeDiscriminant(a, b, c){
    return Math.pow(b, 2) - 4 * a * c;
}

function computeRoots(a, b, d) {
    if(d > 0){
        return {
            root1: computeFirstRoot(a, b, d),
            root2: computeSecondRoot(a, b, d)
        };
    } else if(d === 0){
        return {
            root1: computeFirstRoot(a, b, d),
        };
    } else if(d < 0){
        return {};
    }
}

function computeFirstRoot(a, b, d) {
    return (-b + Math.sqrt(d)) / 2 * a;
}

function computeSecondRoot(a, b, d) {
    return (-b - Math.sqrt(d)) / 2 * a;
}

function roundRoot(root){
    switch(root){
        case null:
            return null;
            break;
        case undefined:
            return null;
            break;
        default:
            return root.toFixed(2);
            break;
    }
}

function computeEquation(a, b, c){
    let d = computeDiscriminant(a, b, c);
    let roots = computeRoots(a, b, d);
    return {
        root1: roundRoot(roots.root1) || null,
        root2: roundRoot(roots.root2) || null
    };
}

module.exports = computeEquation;

