const display = document.getElementById('display');
const buttons = document.querySelectorAll('button');

let currentOperation = '';
let previousOperation = '';
let result = 0;

buttons.forEach((button) => {
    button.addEventListener('click', (e) => {
        const buttonText = e.target.textContent;
        switch (buttonText) {
            case 'C':
                currentOperation = '';
                previousOperation = '';
                result = 0;
                display.value = '';
                break;
            case '←':
                currentOperation = currentOperation.slice(0, -1);
                display.value = currentOperation;
                break;
            case '=':
                try {
                    result = eval(currentOperation);
                    display.value = result;
                    previousOperation = currentOperation;
                    currentOperation = '';
                } catch (error) {
                    display.value = 'Error';
                }
                break;
            case '%':
                currentOperation += '%';
                display.value = currentOperation;
                break;
            case 'mod':
                currentOperation += '%';
                display.value = currentOperation;
                break;
            default:
                currentOperation += buttonText;
                display.value = currentOperation;
        }
    });
});

function handleOperation(operation) {
    switch (operation) {
        case '+':
            return (a, b) => a + b;
        case '-':
            return (a, b) => a - b;
        case '*':
            return (a, b) => a * b;
        case '/':
            return (a, b) => a / b;
        case '%':
            return (a, b) => a % b;
        default:
            return null;
    }
}

function calculate() {
    const operation = previousOperation.match(/[+*/%-]/);
    if (operation) {
        const func = handleOperation(operation[0]);
        const num1 = parseFloat(previousOperation.split(operation[0])[0]);
        const num2 = parseFloat(previousOperation.split(operation[0])[1]);
        result = func(num1, num2);
        display.value = result;
    }
}

