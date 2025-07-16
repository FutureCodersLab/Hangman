import { categories, alphabetLetters } from "./words.js";
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

let chosenWord;
let lettersGuessed = 0;
let incorrectGuessesCount = 0;

const categoryContainer = document.getElementById("category-container");
const alphabetContainer = document.querySelector(".alphabet-container");
const newGamePopup = document.querySelector(".new-game-popup");
const newGameButton = document.getElementById("new-game-button");

document.addEventListener("DOMContentLoaded", () => {
    displayCategories();
    createAlphabetButtons();
    drawInitialStructure();
    newGameButton.addEventListener("click", newGame);
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

    if (!chosenWord) {
        const wordsArray = categories[selectedCategory];
        const randomIndex = Math.floor(Math.random() * wordsArray.length);
        chosenWord = wordsArray[randomIndex].toUpperCase();
        console.log(chosenWord);
    }

    const hiddenWord = document.getElementById("hidden-word");
    hiddenWord.textContent = "";
    hiddenWord.classList.add("active");
    hiddenWord.innerHTML = chosenWord
        .split("")
        .map(() => '<span class="dashes">-</span>')
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
    const selectedLetter = letterButton.textContent;

    if (chosenWord.includes(selectedLetter)) {
        revealLetters(selectedLetter);
        if (lettersGuessed === chosenWord.length) {
            displayResult(true);
        }
    } else {
        incorrectGuessesCount++;
        drawMan();
        if (incorrectGuessesCount === 6) {
            displayResult(false);
        }
    }

    letterButton.disabled = true;
};

const revealLetters = (selectedLetter) => {
    const dashes = document.querySelectorAll(".dashes");
    const chosenWordArray = chosenWord.split("");

    chosenWordArray.forEach((letter, index) => {
        if (letter === selectedLetter) {
            const dash = dashes[index];
            dash.textContent = selectedLetter;
            lettersGuessed++;
        }
    });
};

const drawMan = () => {
    const drawFunctions = [
        drawHead,
        drawBody,
        drawLeftArm,
        drawRightArm,
        drawLeftLeg,
        drawRightLeg,
    ];

    const drawStep = drawFunctions[incorrectGuessesCount - 1];
    drawStep();
};

const displayResult = (isWin) => {
    const h2 = document.querySelector("#results-container h2");
    h2.textContent = isWin ? "You Win" : "You Lose";

    const p = document.querySelector("#results-container p");
    p.textContent = `The chosen word was ${chosenWord}`;

    setTimeout(() => {
        newGamePopup.classList.add("active");
        if (isWin) blastConfetti();
    }, 500);
};

const newGame = () => {
    lettersGuessed = 0;
    incorrectGuessesCount = 0;
    chosenWord = "";

    const hiddenWord = document.getElementById("hidden-word");
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
