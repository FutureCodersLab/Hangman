import { categories, alphabetLetters } from "./words.js";
import { drawInitialStructure } from "./canvas.js";

let chosenWord = "";

const categoryContainer = document.getElementById("category-container");
const alphabetContainer = document.querySelector(".alphabet-container");

document.addEventListener("DOMContentLoaded", () => {
    displayCategories();
    createAlphabetButtons();
    drawInitialStructure();
});
const displayCategories = () => {
    Object.keys(categories).forEach((category) => {
        const button = document.createElement("button");
        button.className = "category";
        button.textContent = category;
        button.addEventListener("click", () => selectCategory(category));
        categoryContainer.appendChild(button);
    });
};
const selectCategory = (selectedCategory) => {
    document.querySelectorAll(".category").forEach((button) => {
        button.textContent.toLowerCase() === selectedCategory
            ? button.classList.add("active")
            : (button.disabled = true);
    });

    const hiddenWord = document.getElementById("hidden-word");
    hiddenWord.textContent = "";

    if (!chosenWord) {
        const wordsArray = categories[selectedCategory];
        const randomIndex = Math.floor(Math.random() * wordsArray.length);
        chosenWord = wordsArray[randomIndex].toUpperCase();
    }

    hiddenWord.classList.add("active");
    hiddenWord.innerHTML = chosenWord
        .split("")
        .map(() => '<span class="dashes">-</span>')
        .join("");
    alphabetContainer.classList.add("active");
};

const createAlphabetButtons = () => {
    const alphabet = alphabetLetters.split("");

    console.log(alphabet);
    alphabet.forEach((letter) => {
        const button = document.createElement("button");
        button.className = "letter";
        button.textContent = letter;
        alphabetContainer.appendChild(button);
    });
};
