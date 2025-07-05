const visor = document.querySelector('.visor');

const numbers = document.querySelectorAll('.button.number');
const clearButton = document.querySelector('.button.clear');
const operations = document.querySelectorAll('.button.operation');
const equal = document.querySelector('.button.equal');

// To change the visor
numbers.forEach(number => {
    number.addEventListener('click', () => {
        visor.textContent += number.textContent;
    });
});

operations.forEach(operation => {
    operation.addEventListener('click', () => {
        if (!visor.innerHTML.includes('+') && 
        !visor.innerHTML.includes('-') &&
        !visor.innerHTML.includes('*') &&
        !visor.innerHTML.includes('/')) {
            visor.textContent += operation.textContent;
        }
    })
})

clearButton.addEventListener('click', () => {
    visor.textContent = '';
});

equal.addEventListener('click', () => calculate())

function calculate() {
    let result = 0
    let operationSymbols = ['+','-','*','/']
    let currentOperation = operationSymbols.filter((operation) => (visor.textContent.includes(operation)))
    console.log(currentOperation)
    let index = visor.textContent.indexOf(currentOperation[0])
    if (currentOperation == false) {return}
    let textVisor = new String(visor.textContent)
    let firstElement = parseFloat(textVisor.slice(0,index))
    let secondElement = parseFloat(textVisor.slice(index+1))
    if (secondElement == NaN) {return}
    switch (currentOperation[0]) {
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
    if (!Number.isInteger(result)) {
        if (String(result).slice(String(result).indexOf('.')+1).length > 6) {
            result = result.toFixed(8)
        }
    }
    visor.textContent = result
}