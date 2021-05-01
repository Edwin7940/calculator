
const calculator = document.querySelector('.calculator')
const keys = document.querySelector('.keys')
const display = document.querySelector('.display')
const actionKey = keys.querySelectorAll('.action')

// setting instructions when keys are click
keys.addEventListener('click', event => {
  // if key isn't clicked return
  if (!event.target.closest('button')) return
  
  const key = event.target
  const keyValue = key.textContent
  const displayValue = display.textContent
  const { type } = key.dataset
  const { previousKeyType } = calculator.dataset

  if (type === 'number') {
    // if theres a 0 in the display, set display = to number 
    if (
      displayValue === '0' ||
      previousKeyType === 'operator'
    ) {
      display.textContent = keyValue
    } else {
      display.textContent = displayValue + keyValue
    }
  }
  // when an operation is selected set first num = what is on display
  // and operator = the operation selected
  if (type === 'operator') {
    calculator.dataset.firstNum = displayValue
    calculator.dataset.operator = key.dataset.key
  }

  // If (=) is pressed get the first number, second number 
  // and the operator and send it to the calculate function
  if (type === 'equal') {
    const firstNum = calculator.dataset.firstNum
    const operator = calculator.dataset.operator
    const secondNum = displayValue
    display.textContent = calculate(firstNum, operator, secondNum)
  }

  // if C is pressed delete the operator, number and set the screen to 0
  if (type === 'clear') {
    display.textContent = '0'
    delete calculator.dataset.firstNum
    delete calculator.dataset.operator
  }

  calculator.dataset.previousKeyType = type
})

// calculation function
function calculate (firstNum, operator, secondNum) {
    firstNum = parseFloat(firstNum);
    secondNum = parseFloat(secondNum);

    if (operator === 'plus') return firstNum + secondNum;
    if (operator === 'minus') return firstNum - secondNum;
    if (operator === 'times') return firstNum * secondNum;
    if (operator === 'divide') return firstNum / secondNum;
}
