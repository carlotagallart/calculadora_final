//GLOBAL VARIABLES
var visor = document.querySelector("#visor");
var label = document.querySelector(".calculator__show__operation");
var darkMode = document.querySelector("#dark__mode");
var calculatorButtons = document.querySelector(".calculator__buttons");

calculatorButtons.addEventListener("click", function (event) {

    let button = event.target.value;
    if (event.target.type === "button") {
        // Reset visor
        if (button == "C") {
            label.innerHTML = "";
            visor.value = "0";

            // add or remove minus sign
        } else if (button == "±") {
            if (visor.value !== "0") {
                label.innerText = visor.value;
                label.innerHTML = (label.innerHTML.includes("-")) ? label.innerHTML.replace(/-/g, "") : "-" + label.innerHTML;
                visor.value = "0";
            } else {
                label.innerHTML = (label.innerHTML.includes("-")) ? label.innerHTML.replace(/-/g, "") : "-" + label.innerHTML;
            }
            // Get results
        } else if (button == "=") {
            result = calculation(label.innerHTML);
            if (isNaN(result)) {
                visor.value = "error";
            } else {
                visor.value = result;
            }

            // Add dot.
        } else if (button == "•") {
            label.innerHTML = label.innerHTML + ".";
        } else {
            // Add data to the operation viewer
            if (visor.value !== "0" && visor.value !== "error" && visor.value !== "NaN") {
                label.innerText = visor.value + button;
                visor.value = "0";

            } else if (visor.value === "error") {
                label.innerText = "";

            } else if (visor.value === "NaN") {
                label.innerText = "";
                visor.value = "0";

            } else {
                label.innerText = label.innerText + button;
            }
        }


        // Smaller numbers when a specified number of characters pass.
        if (label.innerText.length > 24) {
            label.style.fontSize = "16px";
            if (label.innerText.length > 48) {
                label.style.fontSize = "14px";
            }
        }

        if (visor.value.length > 8) {
            visor.style.fontSize = "40px";
            if (visor.value.length > 10) {
                visor.style.fontSize = "35px";
            }
            if (visor.value.length > 12) {
                visor.style.fontSize = "30px";
            }
        }
        if (visor.value.length > 14) {
            visor.value = "error";
        }
    }
});

// Change style to dark mode when the checkbox is checked
darkMode.addEventListener("change", function () {
    let body = document.querySelector("body");
    let calculator = document.querySelector(".calculator");
    if (this.checked) {
        body.className = "dark";
        calculator.classList.add("dark");
    } else {
        body.className = "";
        calculator.classList.remove("dark");
    }
});


function calculation(calc) {

    //Isolate the numbers in an array
    var numbers = calc.split(/\+|\−|\×|\÷|\%/g);

    //Change numbers type from STRING to FLOAT
    for (let z = 0; z < numbers.length; z++) {
        numbers[z] = parseFloat(numbers[z]);
    }

    //Isolate the math operators in an array
    var operator = calc.replace(/[0-9]|\.|\-/g, "").split("");

    //Making a operation string for console.log
    var operation = "";
    for (let i = 0; i <= operator.length; i++) {
        if (i == operator.length) {
            operation = operation + " " + numbers[i];
            break;
        }
        operation = operation + " " + numbers[i] + " " + operator[i];

    }
    //First divide all numbers between the ÷ operator
    var divide = operator.indexOf("÷");
    while (divide != -1) {
        numbers.splice(divide, 2, numbers[divide] / numbers[divide + 1]);
        operator.splice(divide, 1);
        divide = operator.indexOf("÷");
    }
    //Multiply
    var multiply = operator.indexOf("×");
    while (multiply != -1) {
        numbers.splice(multiply, 2, numbers[multiply] * numbers[multiply + 1]);
        operator.splice(multiply, 1);
        multiply = operator.indexOf("×");
    }
    //Subtract
    var subtract = operator.indexOf("−");
    while (subtract != -1) {
        numbers.splice(subtract, 2, numbers[subtract] - numbers[subtract + 1]);
        operator.splice(subtract, 1);
        subtract = operator.indexOf("−");
    }
    //Addition
    var add = operator.indexOf("+");
    while (add != -1) {
        numbers.splice(add, 2, numbers[add] + numbers[add + 1]);
        operator.splice(add, 1);
        add = operator.indexOf("+");
    }
    //Percentage operation
    var module = operator.indexOf("%");
    while (module != -1) {
        numbers.splice(module, 2, numbers[module] * (numbers[module + 1] / 100));
        operator.splice(module, 1);
        module = operator.indexOf("%");
    }
    //Printing the complete calculation on console
    console.log(operation + " = " + numbers);

    return numbers;
}