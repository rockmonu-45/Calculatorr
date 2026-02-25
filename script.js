const display = document.getElementById("display");
const operators = ["+", "-", "*", "/", "%"];

/* Button Press */
function press(value) {
    const current = display.value;
    const lastChar = current.slice(-1);

    // Prevent double operators
    if (operators.includes(value)) {
        if (current === "" || operators.includes(lastChar)) {
            return;
        }
    }

    // Prevent multiple decimals in one number
    if (value === ".") {
        const parts = current.split(/[\+\-\*\/%]/);
        if (parts[parts.length - 1].includes(".")) {
            return;
        }
    }

    display.value += value;
    animateDisplay();
}

/* Clear All */
function clearDisplay() {
    display.value = "";
    animateDisplay();
}

/* Delete Last Character */
function deleteLast() {
    display.value = display.value.slice(0, -1);
    animateDisplay();
}

/* Calculate Result */
function calculate() {
    try {
        if (!display.value) return;

        // Replace % with divide by 100
        let expression = display.value.replace(/%/g, "/100");

        let result = Function('"use strict"; return (' + expression + ')')();

        display.value = Number.isInteger(result)
            ? result
            : parseFloat(result.toFixed(8));

        animateDisplay();

    } catch {
        display.value = "Error";
        setTimeout(() => {
            display.value = "";
        }, 1000);
    }
}

/* Smooth Display Animation */
function animateDisplay() {
    display.style.transform = "scale(1.05)";
    display.style.transition = "0.1s ease";

    setTimeout(() => {
        display.style.transform = "scale(1)";
    }, 100);
}