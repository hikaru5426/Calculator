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



let number1;
let number2;
let operator;
const listOperator = ["+", "-", "x", "/"];

let currentNumber = "";
let previousElement;
pScreen.valid = true;

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
    switch (operator) {
        case "add":
            return add();
            break;
        case "subtract":
            return subtract();
            break;
        case "multiply":
            return multiply();
            break;
        case "divide":
            return divide();
            break;
        default:
            console.log(`Defaut case met in operate function, operator = ${operator}`);
    }
}

function clear() {
    number1 = undefined;
    number2 = undefined;
    operator = undefined;

    currentNumber = "";
    previousElement = undefined;

    pScreen.textContent = "";
    pScreen.valid = true;
    pMalformedExpression.textContent = "";
}

function equal() {
    if (checkOperationValid()) {
        number2 = Number(currentNumber);
        previousElement = "=";
        switch (operator) {
            case "+":
                pScreen.textContent += ` = ${String(add())}`;
                break;
            case "-":
                pScreen.textContent += ` = ${String(subtract())}`;
                break;
            case "x":
                pScreen.textContent += ` = ${String(multiply())}`;
                break;
            case "/":
                pScreen.textContent += ` = ${String(divide())}`;
                break;
            default:
                console.log(`default case met in equal function, operator = ${operator}`);
        }
    }else{
        pScreen.textContent += "=";
    }

}

function checkOperationValid() {
    if (previousElement === "=" || !pScreen.valid) {
        pMalformedExpression.textContent = "Malformed operation, press Clear to reset";
        return false;
    } else {
        return true
    }
}

function operatorClicked(event) {

    if (checkOperationValid()) {
        if (Number(previousElement) == previousElement && operator === undefined) {
            operator = event.target.textContent;

            number1 = Number(currentNumber);
            currentNumber = "";
            pScreen.textContent = `${number1} ${operator}`;
            previousElement = operator;
        } else {
            pMalformedExpression.textContent = "Malformed operation, press Clear to reset";
            pScreen.valid = false;
        }
    }else pScreen.textContent += event.target.textContent;
}

function numberClicked(event) {


    if (checkOperationValid()) {
        const number = event.target.textContent;

        // 1er chiffre
        if (previousElement === undefined) {
            currentNumber = number;
            pScreen.textContent = number;

            // Si dernier élément de l'opération était un chiffre
        } else if (Number(previousElement) == previousElement) {
            currentNumber += number
            pScreen.textContent += number;

            // Si dernier élément de l'opération était un opérateur
        } else {
            currentNumber = number;
            pScreen.textContent = `${number1} ${operator} ${currentNumber}`;
        }

        previousElement = currentNumber;
    }else pScreen.textContent += event.target.textContent;
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