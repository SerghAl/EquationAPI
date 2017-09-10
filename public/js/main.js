`use strict`

;(function(){
    document.addEventListener(`DOMContentLoaded`, () => {

        let qeBtn = document.querySelector(`.qe__send-btn`);
        let ceBtn = document.querySelector(`.ce__send-btn`);

        qeBtn.addEventListener(`click`, (e) => {
            e.preventDefault();

            let a = document.getElementById(`qe-a`).value;
            let b = document.getElementById(`qe-b`).value;
            let c = document.getElementById(`qe-c`).value;

            if(!validateInputNumbers(a, b, c)){
                alert(`Необходимо ввести численные значения!`);
                return false
            }

            let resultAreaSelector = `.qe__results`;

            computeEquation(a, b, c)
                .then(result => renderResult(result, resultAreaSelector))
                .catch(e => console.error(e.message));
        });

        ceBtn.addEventListener(`click`, (e) => {
            e.preventDefault();

            let a = document.getElementById(`ce-a`).value;
            let b = document.getElementById(`ce-b`).value;
            let c = document.getElementById(`ce-c`).value;
            let d = document.getElementById(`ce-d`).value;

            if(!validateInputNumbers(a, b, c, d)){
                alert(`Необходимо ввести численные значения!`);
                return false;
            }

            let resultAreaSelector = `.ce__results`;

            computeEquation(a, b, c, d)
                .then(result => renderResult(result, resultAreaSelector))
                .catch(e => console.error(e.message));
        });

        function computeEquation(a, b, c, d){
            return new Promise((resolve, reject) => {

                let xhr = new XMLHttpRequest();
                let method = `GET`;
                let url = null;

                switch(arguments.length){
                    case 3:
                        url = `/?equation_type=quadratic&a=${a}&b=${b}&c=${c}`;
                        break;
                    case 4:
                        url = `/?equation_type=cubic&a=${a}&b=${b}&c=${c}&d=${d}`;
                }

                xhr.open(method, url, true);

                xhr.onload = function(){
                    if(xhr.status !== 200){
                        reject(new Error(`Запрос не удался`));
                    } else {
                        console.log(xhr.responseText);
                        let result = JSON.parse(xhr.responseText);
                        resolve(result);
                    }
                };

                xhr.send();
            });
        }

        function renderResult(result, areaSelector) {
            let resultArea = document.querySelector(areaSelector);
            resultArea.innerHTML = ``;
            let i = 1;

            for(let key in result){
                let p = document.createElement(`p`);
                let rootName = document.createElement('span');

                p.className = 'result__block';
                rootName.className = 'result__root-name';

                let root = result[key] || `Комплексное число`;

                rootName.appendChild(document.createTextNode(`x${i}`));
                p.appendChild(rootName);
                p.appendChild(document.createTextNode(root));

                i++;
                resultArea.appendChild(p);
            }
        }

        function validateInputNumbers(){
            for(let i = 0; i < arguments.length; i++){
                let n = arguments[i];
                if(isNaN(parseFloat(n)) || !isFinite(n)){
                    return false;
                }
            }
            return true;
        }
    });
})();