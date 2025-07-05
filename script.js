const visor = document.querySelector('.visor');

const numbers = document.querySelectorAll('.button.number');
const clearButton = document.querySelector('.button.clear');
const operations = document.querySelectorAll('.button.operation');
const equal = document.querySelector('.button.equal');
const dot = document.querySelector('.button.dot');
const backspace = document.querySelector('.button.backspace');

document.addEventListener('keydown', (e) => {
    let key = e.key
    console.log(key)
    switch (key) {
        case 'c':
            visor.textContent = ''
            break;
        case 'Enter':
            calculate()
            break;
        case 'Backspace':
            visor.textContent = visor.textContent.slice(0,visor.textContent.length-1)
            break;
        case '.':
            addDot()
            break;
        case '-':
            addOperation(key)
            break
        case '+':
            addOperation(key)
            break
        case '*':
            addOperation(key)
            break
        case '/':
            addOperation(key)
            break
        default:
            break;
    }
    if (Number.isInteger(parseInt(key))) {
        if (visor.textContent == '0') {
            visor.textContent = key;
        }
        else {
            visor.textContent += key;
        }   
    }

})

// To change the visor
numbers.forEach(number => {
    number.addEventListener('click', () => {
        if (visor.textContent == '0') {
            visor.textContent = number.textContent;
        }
        else {
            visor.textContent += number.textContent;
        }   
    });
});

operations.forEach(operation => {
    operation.addEventListener('click', () => addOperation(operation.textContent))
})

function addOperation(key=false) {
    let containOperation = (visor.innerHTML.includes('+') || visor.innerHTML.includes('-') || visor.innerHTML.includes('*') || visor.innerHTML.includes('/') || visor.textContent == '')
        if (!containOperation) {
            if (key == false) {
                console.log('teste')
                visor.textContent += operation.textContent;
            }
            else {visor.textContent += key}
        }
}
clearButton.addEventListener('click', () => {
    visor.textContent = '';
});

dot.addEventListener('click', () => addDot())

function addDot() {
    let operation = detectOperation(visor.textContent)
    if (operation) {
        let index = visor.textContent.indexOf(operation)
        let textVisor = new String(visor.textContent)
        let secondElement = textVisor.slice(index+1)
        if (!secondElement.includes('.')) {visor.textContent += '.'}
    }
    else {
        if (!visor.textContent.includes('.')){
            visor.textContent += '.'
        }
    }
}

backspace.addEventListener('click', () => {
    visor.textContent = visor.textContent.slice(0,visor.textContent.length-1)
})
equal.addEventListener('click', () => calculate())

function calculate() {
    let result = 0
    currentOperation = detectOperation(visor.textContent)
    if (currentOperation == false) {return}
    let index = visor.textContent.indexOf(currentOperation)
    let textVisor = new String(visor.textContent)
    let firstElement = parseFloat(textVisor.slice(0,index))
    let secondElement = parseFloat(textVisor.slice(index+1))
    if (secondElement == NaN) {return}
    switch (currentOperation) {
        case '+':
            result = firstElement + secondElement
            break;
        case '-':
            result = firstElement - secondElement
            break;
        case '*':
            result = firstElement * secondElement
            break;
        case '/':
            result = firstElement / secondElement
            break;
            default:
                break;
            }
    // clean up the number and limit the size
    let roundedNum = Math.round(result * 10000000) / 10000000
    visor.textContent = roundedNum
}

function detectOperation(string) {
    let operationSymbols = ['+','-','*','/']
    let currentOperation = operationSymbols.filter((operation) => (visor.textContent.includes(operation)))[0]
    return currentOperation
}