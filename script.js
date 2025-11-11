import { categories, alphabetLetters, dashElement } from "./words.js";
import { drawInitialStructure } from "./canvas.js";

let secretWord = "";

const categoryContainer = document.getElementById("category-container");
const hiddenWord = document.getElementById("hidden-word");
const alphabetContainer = document.querySelector(".alphabet-container");

document.addEventListener("DOMContentLoaded", () => {
    displayCategories();
    createAlphabetButtons();
    drawInitialStructure();
});

const displayCategories = () => {
    const categoriesArray = Object.keys(categories);
    categoriesArray.forEach((category) => {
        const button = document.createElement("button");
        button.className = "category";
        button.textContent = category;
        button.addEventListener("click", () => selectCategory(category));
        categoryContainer.appendChild(button);
    });
};

const selectCategory = (selectedCategory) => {
    const categoryButtons = document.querySelectorAll(".category");
    categoryButtons.forEach((button) => {
        const isSelected = button.textContent === selectedCategory;

        if (isSelected) {
            button.classList.add("active");
        } else {
            button.disabled = true;
        }
    });

    const wordsArray = categories[selectedCategory];
    const randomIndex = Math.floor(Math.random() * wordsArray.length);
    secretWord = wordsArray[randomIndex];
    console.log(secretWord);

    hiddenWord.classList.add("active");
    hiddenWord.innerHTML = secretWord
        .split("")
        .map(() => dashElement)
        .join("");
    alphabetContainer.classList.add("active");
};

const createAlphabetButtons = () => {
    const alphabet = alphabetLetters.split("");

    alphabet.forEach((letter) => {
        const button = document.createElement("button");
        button.className = "letter";
        button.textContent = letter;
        alphabetContainer.appendChild(button);
    });
};
