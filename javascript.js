const container = document.querySelector("#container");
const pScreen = document.querySelector("#screen");
const pMalformedExpression = document.querySelector("#malformedExpression");
const divBtnNumbers = document.querySelector("#btnNumbers");
const btnOperations = document.querySelector("#btnOperations");

const btnClear = document.querySelector("#btnClear");
const btnEqual = document.querySelector("#btnEqual");

const btnAdd = document.querySelector("#btnAdd");
const btnSubtract = document.querySelector("#btnSubtract");
const btnMultiply = document.querySelector("#btnMultiply");
const btnDivide = document.querySelector("#btnDivide");

const precision = 2;



let number1;
let number2;
let operator;

function add() {
    return number1 + number2;
}

function subtract() {
    return number1 - number2;
}

function multiply() {
    return number1 * number2;
}

function divide() {
    if (number2 !== 0) {
        return number1 / number2;
    } else {
        return "It is impossible to divide a number by 0";
    }
}

function operate() {
    let result;
    switch (operator) {
        case "+":
            result = add();
            break;
        case "-":
            result = subtract();
            break;
        case "x":
            result = multiply();
            break;
        case "/":
            result = divide();
            break;
        default:
            console.log(`Defaut case met in operate function, operator = ${operator}`);
    }
    return (Math.round(result * 10**precision) / 10**precision);
}

function clear() {
    number1 = undefined;
    number2 = undefined;
    operator = undefined;

    pScreen.textContent = "";
    pMalformedExpression.textContent = "";
}

function equal() {
    if (number1 !== undefined && operator !== undefined && pScreen.textContent !== undefined && Number(pScreen.textContent) == pScreen.textContent) {
        number2 = Number(pScreen.textContent);
        pScreen.textContent = operate();
        number1 = Number(pScreen.textContent);
        operator = undefined;
        number2 = undefined;
    }

}

function operatorClicked(event) {
    equal();

    if (Number(pScreen.textContent) == pScreen.textContent && operator === undefined) {
        operator = event.target.textContent;

        number1 = Number(pScreen.textContent);
        pScreen.textContent = operator;
    }else operator = event.target.textContent;
}

function numberClicked(event) {
    const number = event.target.textContent;

    // S'il y a déjà un/des chiffres à l'écran
    if (Number(pScreen.textContent) == pScreen.textContent) {
        pScreen.textContent += number;
    } 

    // Si c'est le premier élément de l'opération ou que le dernier élément était un opérateur
    else {
        pScreen.textContent = number;
    }


}

function createPage() {
    for (let i = 9; i >= 0; i--) {
        const btn = document.createElement("button");
        btn.textContent = String(i);
        btn.addEventListener("click", numberClicked)
        divBtnNumbers.appendChild(btn);
    }

    btnClear.addEventListener("click", clear);
    btnEqual.addEventListener("click", equal);

    btnOperations.childNodes.forEach(node => {
        node.addEventListener("click", operatorClicked);
    })

}

createPage();