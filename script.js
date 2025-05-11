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
let result = '';
let operatorMode = '';
let enteringSecondNumber = false;

numberBtns.forEach(btn => {
    btn.addEventListener('click', handleNumberInput);
});

operatorBtns.forEach(btn => {
    btn.addEventListener('click', handleOperators);
});

equalsBtn.addEventListener('click', handleEquals);

clearBtn.addEventListener('click', handleClear);

negateBtn.addEventListener('click', handleNegate);

function handleNumberInput(event) {
    const number = event.target;

    if (!number.classList.contains('btn-primary')) return;


    const value = number.innerText;

    // Append number and update screen
    if (enteringSecondNumber == false) {
        firstNumber = firstNumber.concat(value);
        screen.innerText = firstNumber;
    } else if (enteringSecondNumber == true) {
        num = num.concat(value);
        screen.innerText = num;
    }
}

function handleOperators(event) {
    // create logic to handle operators
    const operatorBtn = event.target;
    enteringSecondNumber = true;
    
    if (!operatorBtn.classList.contains('btn-warning')) return;
    currentValue = parseFloat(firstNumber);

    const operator = operatorBtn.innerText;

    if (operator == '+') {
        operatorMode = 'add';
        return operatorMode;
    } else if (operator == '-') {
        operatorMode = 'subtract';
        return operatorMode;
    }
    else if (operator == 'x') {
        operatorMode = 'multiply';
        return operatorMode;
    }
    else if (operator == '/') {
        operatorMode = 'divide';
        return operatorMode;
    }
    else if (operator === '%') {
        operatorMode = 'remainder';
        return operatorMode;
    }

}

function handleEquals(event) {
    num = parseFloat(num);
    const calc = new Calculator(currentValue);

    const eqlBtn = event.target;
    if (!eqlBtn.classList.contains('btn-info')) return;

    

    if (currentValue != '' && num != '') {
        switch(operatorMode) {
            case 'add':
                result = calc.add(num);
                screen.innerText = result;
                firstNumber = result;
                num = '';
                enteringSecondNumber = false;
                break;

            case 'subtract':
                result = calc.subtract(num);
                screen.innerText = result;
                firstNumber = result;
                num = '';
                enteringSecondNumber = false;
                break;
            
            case 'multiply':
                result = calc.multiply(num);
                screen.innerText = result;
                firstNumber = result;
                num = '';
                enteringSecondNumber = false;
                break;

            case 'divide':
                result = calc.divide(num);
                screen.innerText = result;
                firstNumber = result;
                num = '';
                enteringSecondNumber = false;
                break;

            case 'remainder':
                result = calc.remainder(num);
                screen.innerText = result;
                firstNumber = result;
                num = '';
                enteringSecondNumber = false;
                break;
        }
    }
}

function handleClear(event) {
    const acBtn = event.target;

    if (!acBtn.classList.contains('clearBtn')) return;

    currentValue = '';
    firstNumber = '';
    num = '';
    result = '';
    operatorMode = '';
    enteringSecondNumber = false;
    screen.innerText = '';
}

function handleNegate(event) {
    const negate = event.target;
    const minus = '-';

    if (!negate.classList.contains('negateBtn')) return;

    if (enteringSecondNumber == false && firstNumber != '' && firstNumber[0] != '-') {
        firstNumber = minus.concat(firstNumber);
        screen.innerText = firstNumber;
    } else if (enteringSecondNumber == true && num != '' && num[0] != '-') {
        num = minus.concat(num);
        screen.innerText = num;
    }
}

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



