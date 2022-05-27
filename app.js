const prevOperand = document.querySelector(".previous-operand");
const currentOperand = document.querySelector(".current-operand");
const btnAllClear = document.querySelector(".btn-allclear");
const btnClear = document.querySelector(".btn-clear");
const allNumbers = document.querySelectorAll(".number");
const allOperators = document.querySelectorAll(".operator");
const btnEqual = document.querySelector(".equal");

let display1 = "";
let display2 = "";
let output = null;
let lastOperation = "";
let havePeriod = false;

allNumbers.forEach((number) => {
  number.addEventListener("click", (evt) => {
    if (evt.target.innerText === "." && !havePeriod) {
      havePeriod = true;
    } else if (evt.target.innerText === "." && havePeriod) {
      return;
    }
    display1 += evt.target.innerText;
    currentOperand.innerText = display1;
  });
});

allOperators.forEach((operation) => {
  operation.addEventListener("click", (evt) => {
    if (!display1) return;
    havePeriod = false;

    const operationName = evt.target.innerText;
    if (display1 && display2 && lastOperation) {
      doCalculation();
    } else {
      output = parseFloat(display1);
    }
    updateDisplay(operationName);
    lastOperation = operationName;
  });
});

function updateDisplay(operator = " ") {
  display2 += `${display1} ${operator} `;
  prevOperand.innerText = display2;
  currentOperand.innerText = "";
  display1 = "";
}

function doCalculation() {
  const prev = parseFloat(output);
  const current = parseFloat(display1);

  switch (lastOperation) {
    case "+":
      output = prev + current;
      break;
    case "-":
      output = prev - current;
      break;
    case "x":
      output = prev * current;
      break;
    case "÷":
      output = prev / current;
      break;
    default:
      return;
  }
}

function clear() {
  currentOperand.innerText = currentOperand.innerText.slice(0, -1);
  display1 = "";
}

function clearAll() {
  prevOperand.innerText = "0";
  display2 = "";
  currentOperand.innerText = "0";
  display1 = "";
  output = "";
  console.log("clear all");
}

btnClear.addEventListener("click", () => {
  clear();
});

btnAllClear.addEventListener("click", () => {
  clearAll();
});

btnEqual.addEventListener("click", () => {
  if (!display1 || !display2) return;
  havePeriod = false;
  doCalculation();
  updateDisplay();
  currentOperand.innerText = output;
  display1 = output;
  display2 = "";
});
