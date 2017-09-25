`use strict`

;(function(){
    document.addEventListener(`DOMContentLoaded`, () => {

        let qeBtn = document.querySelector(`.qe__send-btn`);
        let ceBtn = document.querySelector(`.ce__send-btn`);
        let qteBtn = document.querySelector(`.qte__send-btn`);

        let addVectorBtn = document.querySelector(`.vectors__add-btn`);
        let sendVectorsBtn = document.querySelector(`.vectors__send-btn`);
        let vectorsList = document.querySelector(`.vectors__inputs`);

        if(qeBtn){
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
                    .then(result => renderEquationResult(result, resultAreaSelector))
                    .catch(e => console.error(e.code, e.message));
            });
        }

        if(ceBtn){
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
                    .then(result => renderEquationResult(result, resultAreaSelector))
                    .catch(e => console.error(e.code, e.message));
            });
        }

        if(qteBtn){
            qteBtn.addEventListener(`click`, (e) => {
                e.preventDefault();

                let a = document.getElementById(`qte-a`).value;
                let b = document.getElementById(`qte-b`).value;
                let c = document.getElementById(`qte-c`).value;
                let d = document.getElementById(`qte-d`).value;
                let e1 = document.getElementById(`qte-e`).value;

                if(!validateInputNumbers(a, b, c, d, e1)){
                    alert(`Необходимо ввести численные значения!`);
                    return false;
                }

                let resultAreaSelector = `.qte__results`;

                computeEquation(a, b, c, d, e1)
                    .then(result => {renderEquationResult(result, resultAreaSelector)})
                    .catch(e => console.error(e.code, e.message));
            });
        }

        if(addVectorBtn){
            addVectorBtn.addEventListener(`click`, (e) => {
                e.preventDefault();
                e.stopPropagation();

                let vectorsList = document.querySelector(`.vectors__list`);

                let vectorInput = createNewVectorInput();
                let delVectorInputBtn = createDeleteVectorInputBtn();

                vectorInput.appendChild(delVectorInputBtn);
                vectorsList.appendChild(vectorInput);
            })
        }

        if(sendVectorsBtn){
            sendVectorsBtn.addEventListener(`click`, (e) => {
                e.preventDefault();
                e.stopPropagation();

                let vectors = grabAllVectorsInputsValues();

                if(!hasNumericArrays(vectors)){
                    alert(`Векторы должны содержать только численные значения!`);
                    return false;
                }

                if(!hasEqualLengthArrays(vectors)){
                    alert(`Передаваемые векторы имеют разную размерность!`);
                    return false;
                }

                vectors = JSON.stringify(vectors);

                let resultAreaSelector = `.vectors__results`;
                clearElement(resultAreaSelector);
                console.clear();

                checkVectorsSpace(vectors)
                    .then(result => {
                        if(result === true){
                            let text = `Переданный массив векторов является векторным пространством`;
                            renderTextResult(text, resultAreaSelector)
                        } else if(result === false){
                            let text = `Переданный массив векторов НЕ является векторным пространством`;
                            renderTextResult(text, resultAreaSelector)
                        }
                    })
                    .catch(e => console.error(e.code, e.message));
            })
        }

        if(vectorsList){
            vectorsList.addEventListener('click', (e) => {
                let target = e.target;
                while (target !== vectorsList) {
                    if(target.className === 'vectors__del-btn'){
                        e.preventDefault();
                        e.stopPropagation();

                        deleteVectorInput(target);
                        return;
                    }
                    target = target.parentNode;
                }
            });
        }

        function grabAllVectorsInputsValues(){
            let vectorsInputs = document.getElementsByClassName('vectors__input');
            let result = [];
            for(let input of vectorsInputs) {
                let arr = input.value.split(',');
                for(let i = 0; i < arr.length; i++){
                    // привожу все значения введеного вектора к числам
                    arr[i] = parseInt(arr[i]);
                }
                result.push(arr);
            }
            return result;
        }

        function checkVectorsSpace(vectors){
            return new Promise((resolve, reject) => {

                let xhr = new XMLHttpRequest();
                let method = `GET`;
                let url = `/api/v1/vectors-space/?vectors=${vectors}`;

                xhr.open(method, url, true);

                xhr.onload = function(){
                    if(xhr.status !== 200){
                        reject(new Error(`Запрос не удался`));
                    } else {
                        let result = JSON.parse(xhr.responseText);

                        if(result.result === 'ok'){
                            resolve(result.data);
                        } else if(result.result === 'error'){
                            reject(result.error);
                        }
                    }
                };

                xhr.send();
            });
        }

        function deleteVectorInput(target){
            let vectorsList = document.querySelector(`.vectors__list`);
            let childToDelete = target.parentNode;
            vectorsList.removeChild(childToDelete);
        }

        function createNewVectorInput(){
            let liElement = document.createElement(`li`);
            let inputElement = document.createElement(`input`);

            liElement.className = `vectors__item`;
            inputElement.className = `vectors__input`;
            inputElement.type = `text`;

            liElement.appendChild(inputElement);

            return liElement;
        }

        function createDeleteVectorInputBtn(){
            let btnElement = document.createElement(`button`);
            let iconElement = document.createElement(`img`);

            btnElement.className = `vectors__del-btn`;
            iconElement.src = `http://localhost:3000/images/close.png`;
            iconElement.alt = `Иконка крестика`;
            iconElement.className = `vectors__close-icon`;

            btnElement.appendChild(iconElement);

            return btnElement;
        }

        function computeEquation(a, b, c, d, e){
            return new Promise((resolve, reject) => {

                let xhr = new XMLHttpRequest();
                let method = `GET`;
                let url = null;

                switch(arguments.length){
                    case 3:
                        url = `/api/v1/quadratic/?a=${a}&b=${b}&c=${c}`;
                        break;
                    case 4:
                        url = `/api/v1/cubic/?a=${a}&b=${b}&c=${c}&d=${d}`;
                        break;
                    case 5:
                        url = `/api/v1/quartic/?a=${a}&b=${b}&c=${c}&d=${d}&e=${e}`;
                        break;
                }

                xhr.open(method, url, true);

                xhr.onload = function(){
                    if(xhr.status !== 200){
                        reject(new Error(`Запрос не удался`));
                    } else {
                        let result = JSON.parse(xhr.responseText);

                        if(result.result === 'ok'){
                            resolve(result.data);
                        } else if(result.result === 'error'){
                            reject(result.error);
                        }
                    }
                };

                xhr.send();
            });
        }

        function renderEquationResult(result, areaSelector) {
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

        function renderTextResult(result, areaSelector) {
            let resultArea = document.querySelector(areaSelector);
            resultArea.innerHTML = ``;

            let p = document.createElement(`p`);
            p.className = 'vectors__result';

            p.appendChild(document.createTextNode(result));
            resultArea.appendChild(p);
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

        function hasNumericArrays(mainArr){
            for(let arr of mainArr){
                for(let item of arr){
                    if(!validateInputNumbers(item)){
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

        function clearElement(selector){
            let element = document.querySelector(selector);
            element.innerHTML = '';
        }
    });
})();