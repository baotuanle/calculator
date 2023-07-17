let firstNumber = "";
let operator = "";
let secondNumber = "";
let currentNumber = "";
const numberButtons = document.querySelectorAll(".input_button");
const clearButton = document.querySelector("#clear");
const deletebutton = document.querySelector("#delete");
const historyDisplay = document.querySelector(".history")

document.getElementById("equals").disabled = true;
document.getElementById("add").disabled = true;
document.getElementById("subtract").disabled = true;
document.getElementById("multiply").disabled = true;
document.getElementById("divide").disabled = true;

const display = document.querySelector(".display");
display.textContent = "0";


const operators = ["+", "-", "x", "÷"];

function add(a, b) {
  return a + b;
}

function subtract(a, b) {
  return a - b;
}

function multiply(a, b) {
  return a * b;
}

function divide(a, b) {
  if (a === 0) {
    return "Error";
  } else {
    return a / b;
  }
}

function operate(a, operator, b) {
  const num1 = parseFloat(a);
  const num2 = parseFloat(b);

  if (operator === "+") {
    return add(num1, num2);
  }
  if (operator === "-") {
    return subtract(num1, num2);
  }
  if (operator === "x") {
    return multiply(num1, num2);
  }
  if (operator === "÷") {
    return divide(num1, num2);
  }
}

function deleteSomething() {
  if (secondNumber !== "") {
    secondNumber = secondNumber.slice(0, -1);
    display.textContent = display.textContent.slice(0, -1);
  } else if (operator !== "") {
    operator = "";
  } else if (firstNumber !== "") {
    firstNumber = firstNumber.slice(0, -1);
    display.textContent = display.textContent.slice(0, -1);
  }
}

function clearDisplay (e) {
    display.textContent = "";
    firstNumber = "";
    secondNumber = "";
    operator = "";
    currentNumber = "";
    historyDisplay.textContent = "";
    document.getElementById("equals").disabled = true;
    document.getElementById("add").disabled = true;
    document.getElementById("multiply").disabled = true;
    document.getElementById("divide").disabled = true;
}

function displayHistory(input) {
  if (input === secondNumber) {
    historyDisplay.textContent = `${firstNumber} ${operator}`;
  }
  else if (input === "=") {
    historyDisplay.textContent = `${firstNumber} ${operator} ${secondNumber} = `;
  }
  
}

function changeDisplay(input) {
  document.getElementById("add").disabled = false;
  document.getElementById("subtract").disabled = false;
  document.getElementById("multiply").disabled = false;
  document.getElementById("divide").disabled = false;


  if (input === ".") {
    document.getElementById("decimal").disabled = true;
  }

  if (input === "=") { 
    displayHistory(input);
    currentNumber = operate(firstNumber, operator, secondNumber);
    currentNumber = currentNumber.toString();
    firstNumber = currentNumber;
    display.textContent = firstNumber;
    operator = "";
    secondNumber = "";

  } else if (operators.includes(input)) {
    document.getElementById("decimal").disabled = false;
    if (secondNumber !== "") {
      currentNumber = operate(firstNumber, operator, secondNumber);
      currentNumber = currentNumber.toString();
      firstNumber = currentNumber;
      display.textContent = firstNumber;
      secondNumber = "";
      document.getElementById("equals").disabled = true;
    }
    operator = input;
    display.textContent = firstNumber;
  } else {
    if (display.textContent === "0") {
      display.textContent = "";
    }
    display.textContent += input;
    if (operator === "") {
      firstNumber += input;
    } else {
      document.getElementById("equals").disabled = false;
      secondNumber += input;
      display.textContent = secondNumber;
      displayHistory(input);
    }
  }
}

numberButtons.forEach((button) => {
  button.addEventListener("click", () => {
    changeDisplay(button.textContent);
  });
});

clearButton.addEventListener("click", clearDisplay);
deletebutton.addEventListener("click", deleteSomething);