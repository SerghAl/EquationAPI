`use strict`

function computeRoots(a, b, c, p, q, Q) {
    if(Q > 0){
        let A = Math.cbrt(-q / 2 + Math.sqrt(Q));
        let B = Math.cbrt(-q / 2 - Math.sqrt(Q));
        let y1 = A + B;
        let x1 = y1 - a / 3;

        let y2 = null;
        let x2 = null;
        if(A.toFixed(6) === B.toFixed(6)){
            y2 = -(A + B) / 2;
            x2 = y2 - a / 3;
        }

        return {
            root1: x1,
            root2: x2,
            root3: x2
        }
    } else if(Q === 0){
        let A = Math.cbrt(-q / 2);

        if(A === 0){
            let y = A;
            let x = y - a / 3;
            return {
                root1: x
            }
        } else {
            let y1 = A;
            let x1 = y1 - a / 3;

            let y2 = 2 * A;
            let x2 = y2 - a / 3;

            return {
                root1: x1,
                root2: x2,
                root3: x2
            }
        }
    } else if(Q < 0){
        let cosFi = -q / 2 * (Math.pow(3 / -p, 3 / 2));
        let fi = Math.acos(cosFi);

        let y1 = 2 * Math.sqrt(-p / 3) * Math.cos(fi / 3);
        let y2 = 2 * Math.sqrt(-p / 3) * Math.cos(fi / 3 + 2 * Math.PI / 3);
        let y3 = 2 * Math.sqrt(-p / 3) * Math.cos(fi / 3 - 2 * Math.PI / 3);

        let x1 = y1 - a / 3;
        let x2 = y2 - a / 3;
        let x3 = y3 - a / 3;

        return {
            root1: x1,
            root2: x2,
            root3: x3
        }
    }
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

function computeEquation(a, b, c, d){
    if(a !== 1) {
        let a0 = a;
        a = b / a0;
        b = c / a0;
        c = d / a0;
    } else {
        a = b;
        b = c;
        c = d;
    }

    let p = -Math.pow(a, 2)/3 + b;
    let q = 2 * Math.pow(a / 3, 3) - a * b / 3 + c;
    let Q = Math.pow(p / 3, 3) + Math.pow(q / 2, 2);

    let roots = computeRoots(a, b, c, p, q, Q);

    return {
        root1: roundRoot(roots.root1) || null,
        root2: roundRoot(roots.root2) || null,
        root3: roundRoot(roots.root3) || null
    };
}

module.exports = computeEquation;

