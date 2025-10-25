const container = document.querySelector("#container");
const pScreen = document.querySelector("#screen");
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

function add(number1, number2) {
    return number1 + number2;
}

function subtract(number1, number2) {
    return number1 - number2;
}

function multiply(number1, number2) {
    return number1 * number2;
}

function divide(number1, number2) {
    if (number2 !== 0) {
        return number1 / number2;
    } else {
        return "Error b = 0";
    }
}

function operate() {
    switch (operator) {
        case "add":
            return add(number1, number2);
            break;
        case "subtract":
            return subtract(number1, number2);
            break;
        case "multiply":
            return multiply(number1, number2);
            break;
        case "divide":
            return divide(number1, number2);
            break;
        default:
            console.log(`Defaut case met in operate function, operator = ${operator}`);
    }
}

function clear(){
    number1 = undefined;
    number2 = undefined;
    operator = undefined;

    pScreen.textContent = "";
}

function equal(){
    switch(operator){
        case "add":
            pScreen.textContent += ` = ${add(number1, number2)}`;
            break;
        case "subtract":
            pScreen.textContent += ` = ${subtract(number1, number2)}`;
            break;
        case "multiply":
            pScreen.textContent += ` = ${multiply(number1, number2)}`;
            break;
        case "divide":
            pScreen.textContent += ` = ${divide(number1, number2)}`;
            break;
        default:
            console.log(`default case met in equal function, operator = ${operator}`);
    }
}

function operatorClicked(event) {
    const sign = event.target.textContent;
    switch(sign){
        case "+":
            operator = "add";
            break;
        case "-":
            operator = "subtract";
            break;
        case "x":
            operator = "multiply";
            break;
        case "/":
            operator = "divide";
            break;
        default:
            console.log(`default case met in operatorClicked function, sign = ${sign}`);
    }

    pScreen.textContent += ` ${sign}`;
    console.log(`The operation clicked is ${operator}`);
}

function numberClicked(event) {
    const number = Number(event.target.textContent);

    if(number1 === undefined) {
        number1 = number;
        pScreen.textContent += String(number);
    } else{
        number2 = number;
        pScreen.textContent += ` ${String(number)}`;
    }
    
    console.log(`The number clicked is ${number}`);
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