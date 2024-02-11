"use strict";

const box = document.querySelector(".box");
const numbers = document.querySelector(".numbers");
const options = document.querySelector(".options");
const resultsBox = document.querySelector(".results-box");
const result = document.querySelector(".result");
const history = document.querySelector(".history");

class App {
    constructor() {
        this.setNumbers();
        this.setOptions();
        this.useNumbers();
        this.useOptions();
        // this.setHistory();
        this.setDelete();
        this.setEquality();
    }
    setNumbers() {
        const numbersArray = Array.from({ length: 9 }, (v, i) => i + 1);
        numbersArray.push(0);
        numbersArray.forEach((element) => {
            const number = document.createElement("button");
            number.textContent = element;
            number.classList.add("number", "button-30");
            number.addEventListener("click", this.useNumbers.bind(this));
            numbers.appendChild(number);
        });
    }
    useNumbers(e) {
        if (e && e.target && e.target.classList.contains("number")) {
            const number = e.target.textContent;
            result.textContent += number;
        }
    }
    setOptions() {
        const optionsArray = ["+", "-", "*", "/", "%"];
        optionsArray.forEach((option) => {
            const newOpt = document.createElement("button");
            newOpt.textContent = option;
            newOpt.classList.add("option", "button-30");
            options.appendChild(newOpt);
            newOpt.addEventListener("click", this.useOptions.bind(this));
        });
    }
    useOptions(e) {
        if (e && e.target && e.target.classList.contains("option")) {
            const target = e.target.textContent;
            result.textContent += target;
        }
    }

    setDelete() {
        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "Delete";
        deleteBtn.classList.add("number", "button-30", "delete");

        // Filter out text nodes and select the last button element
        const lastButton = Array.from(numbers.children)
            .filter((child) => child.tagName.toLowerCase() === "button")
            .pop();

        // Insert the delete button before the last button
        numbers.insertBefore(deleteBtn, lastButton);
        deleteBtn.addEventListener("click", this.useDelete.bind(this));
    }
    useDelete(e) {
        if (e && e.target && e.target.classList.contains("delete")) {
            if (result.textContent === "Error") {
                result.textContent = "";
            } else {
                result.textContent = result.textContent.slice(0, -1);
            }
        }
    }

    setEquality() {
        const equal = document.createElement("button");
        equal.textContent = "=";
        equal.classList.add("number", "button-30");
        numbers.appendChild(equal);
        equal.addEventListener("click", this.useEquality.bind(this));
    }
    useEquality() {
        try {
            let equality = eval(result.textContent);
            if (typeof equality === "number") {
                result.textContent = equality;
            }
        } catch (error) {
            result.textContent = "Error";
        }
    }
}
const newCalc = new App();
