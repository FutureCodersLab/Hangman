import { categories, alphabetLetters, dashElement } from "./words.js";
import { blastConfetti } from "./confetti.js";
import {
    drawBody,
    drawHead,
    drawInitialStructure,
    drawLeftArm,
    drawLeftLeg,
    drawRightArm,
    drawRightLeg,
} from "./canvas.js";

let secretWord;
let correctGuesses = 0;
let wrongGuesses = 0;

const categoryContainer = document.getElementById("category-container");
const hiddenWord = document.getElementById("hidden-word");
const alphabetContainer = document.querySelector(".alphabet-container");
const newGamePopup = document.querySelector(".new-game-popup");
const newGameButton = document.getElementById("new-game-button");

document.addEventListener("DOMContentLoaded", () => {
    displayCategories();
    createAlphabetButtons();
    drawInitialStructure();
    newGameButton.addEventListener("click", startNewGame);
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
        button.addEventListener("click", selectLetter);
        alphabetContainer.appendChild(button);
    });
};

const selectLetter = (e) => {
    const letterButton = e.target;
    const chosenLetter = letterButton.textContent;

    if (secretWord.includes(chosenLetter)) {
        revealLetters(chosenLetter);
        if (correctGuesses === secretWord.length) {
            displayResult(true);
        }
    } else {
        wrongGuesses++;
        drawNextPart();
        if (wrongGuesses === 6) {
            displayResult(false);
        }
    }

    letterButton.disabled = true;
};

const revealLetters = (chosenLetter) => {
    const dashes = document.querySelectorAll(".dashes");
    const secretWordArray = secretWord.split("");

    secretWordArray.forEach((letter, index) => {
        if (letter === chosenLetter) {
            const dash = dashes[index];
            dash.textContent = chosenLetter;
            correctGuesses++;
        }
    });
};

const drawNextPart = () => {
    const drawFunctions = [
        drawHead,
        drawBody,
        drawLeftArm,
        drawRightArm,
        drawLeftLeg,
        drawRightLeg,
    ];

    const drawStep = drawFunctions[wrongGuesses - 1];
    drawStep();
};

const displayResult = (isWin) => {
    const h2 = document.querySelector(".new-game-popup h2");
    h2.textContent = isWin ? "You Win" : "You Lose";

    const p = document.querySelector(".new-game-popup p");
    p.textContent = `The chosen word was ${secretWord.toUpperCase()}`;

    setTimeout(() => {
        newGamePopup.classList.add("active");
        if (isWin) {
            blastConfetti();
        }
    }, 500);
};

const startNewGame = () => {
    correctGuesses = 0;
    wrongGuesses = 0;
    secretWord = "";

    hiddenWord.innerHTML = "";
    categoryContainer.innerHTML = "";
    alphabetContainer.innerHTML = "";

    hiddenWord.classList.remove("active");
    alphabetContainer.classList.remove("active");
    newGamePopup.classList.remove("active");

    displayCategories();
    createAlphabetButtons();
    drawInitialStructure();
};
