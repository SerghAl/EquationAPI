`use strict`

const express = require(`express`);
const quadraticEquation = require(`./app_modules/quadratic-equation`);
const cubicEquation = require(`./app_modules/cubic-equation`);
const isNumeric = require(`./app_modules/validator`);

const app = express();

app.use(express.static(__dirname + `/public`));

app.get(`/`, function(req, res) {
    let query = req.query;
    if( Object.keys(query).length && query.equation_type){

        let a = isNumeric(query.a) ? query.a : null;
        let b = isNumeric(query.b) ? query.b : null;
        let c = isNumeric(query.c) ? query.c : null;
        let d = isNumeric(query.d) ? query.d : null;
        let result = null;

        switch(query.equation_type){
            case `quadratic`:
                if(!isNumeric(a, b, c)){
                    res.status(500);
                    res.send(`Попытка ввода неизвестных параметров`);
                    break;
                }

                result = quadraticEquation(a, b, c);
                res.json(result);
                break;

            case `cubic`:
                if(!isNumeric(a, b, c, d)){
                    res.status(500);
                    res.send(`Попытка ввода неизвестных параметров`);
                    break;
                }

                result = cubicEquation(a, b, c, d);
                res.json(result);
                break;
        }
    } else {
        res.sendFile(__dirname + `/views/index.html`);
    }
});

app.get(`/*`, (req, res) => {
    res.status(404);
    res.send(`This resource doesn't exist`);
});

app.listen(3000, () => {
    console.log(`Server is working on port 3000`);
});