`use strict`

let quadraticEquation = require(`./quadratic-equation`);
let cubicEquation = require(`./cubic-equation`);

function computeRoots(a, b, c, d){
    let aCubic = 1;
    let bCubic = -b;
    let cCubic = a * c - 4 * d;
    let dCubic = -Math.pow(a, 2) * d + 4 * b * d - Math.pow(c, 2);

    let cubicRoots = cubicEquation(aCubic, bCubic, cCubic, dCubic);
    let z = findRealRoot(cubicRoots);

    let aQuad = 1;
    let bQuad1 = a / 2 + Math.sqrt(Math.pow(a, 2) / 4 - b + z);
    let bQuad2 = a / 2 - Math.sqrt(Math.pow(a, 2) / 4 - b + z);
    let cQuad1 = z / 2 + Math.sqrt(Math.pow(z, 2) / 4 - d);
    let cQuad2 = z / 2 - Math.sqrt(Math.pow(z, 2) / 4 - d);

    let firstQuadraticRoots = quadraticEquation(aQuad, bQuad1, cQuad1);
    let secondQuadraticRoots = quadraticEquation(aQuad, bQuad2, cQuad2);

    return {
        root1: Number(firstQuadraticRoots.root1) || null,
        root2: Number(firstQuadraticRoots.root2) || null,
        root3: Number(secondQuadraticRoots.root1) || null,
        root4: Number(secondQuadraticRoots.root2) || null
    }
}

function findRealRoot(roots){
    for(let key in roots){
        if(roots[key]){
            return Number(roots[key]);
        }
    }
    return null;
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

function computeEquation(a, b, c, d, e){
    if(a !== 1) {
        let a0 = a;
        a = b / a0;
        b = c / a0;
        c = d / a0;
        d = e / a0;
    } else {
        a = b;
        b = c;
        c = d;
        d = e;
    }

    let roots = computeRoots(a, b, c, d);

    return {
        root1: roundRoot(roots.root1) || null,
        root2: roundRoot(roots.root2) || null,
        root3: roundRoot(roots.root3) || null,
        root4: roundRoot(roots.root4) || null
    };
}

module.exports = computeEquation;

