// javascript logic for calculator
const screen = document.getElementById('screen');
const numberBtns = document.querySelectorAll('[data-type="number"]');
const operatorBtns = document.querySelectorAll('[data-type="operator"]');
const clearBtn = document.querySelector('[data-type="clear"]');
const negateBtn = document.querySelector('[data-type="negate"]');
const equalsBtn = document.querySelector('[data-type="equals"]');

let currentValue = '';
let firstNumber = '';
let num = '';
let operatorMode = '';

numberBtns.forEach(btn => {
    btn.addEventListener('click', handleNumberInput);
});

operatorBtns.forEach(btn => {
    btn.addEventListener('click', handleOperators);
});

function handleNumberInput(event) {
    const number = event.target;

    if (!number.classList.contains('btn-primary')) return;

    const value = number.innerText;

    // Append number and update screen
    firstNumber = firstNumber.concat(value);
    screen.innerText = firstNumber;

}

function handleOperators(event) {
    // create logic to handle operators
    const operatorBtn = event.target;
    
    if (!operatorBtn.classList.contains('btn-warning')) return;

    currentValue = firstNumber;
    
    firstNumber = num;
    

}

function handleEquals(event) {
    const eqlBtn = event.target;

    if (!eqlBtn.classList.contains('btn-info')) return;

    if (currentValue != '' && num != '') {
        
    }
}

console.log("this is currentValue:", currentValue);

class Calculator {
    constructor(currentValue) {
        this.currentValue = currentValue;
        this.log = []
    }

    add(num) {
        this.log.push(`${this.currentValue} + ${num}`);
        this.currentValue += num;
        return this.currentValue;
    }

    subtract(num) {
        this.log.push(`${this.currentValue} - ${num}`);
        this.currentValue -= num;
        return this.currentValue;
    }

    multiply(num) {
        this.log.push(`${this.currentValue} * ${num}`);
        this.currentValue *= num;
        return this.currentValue;
    }

    divide(num) {
        this.log.push(`${this.currentValue} / ${num}`);
        this.currentValue /= num;
        return this.currentValue;
    }

    remainder(num) {
        this.log.push(`${this.currentValue} % ${num}`);
        this.currentValue %= num;
        return this.currentValue;
    }


    getHistory() {
        return [...this.log];
    }

    undo() {
        if (this.log.length === 0) return this.currentValue;

        const last = this.log.pop();
        const [num1, operator, num2] = last.split(" ");
        this.currentValue = parseFloat(num1);
    }
}

const calc = new Calculator();
