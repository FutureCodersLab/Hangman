import { categories } from "./words.js";
import {
    drawHead,
    drawBody,
    drawLeftArm,
    drawRightArm,
    drawLeftLeg,
    drawRightLeg,
    drawInitialStructure,
    clearCanvas,
} from "./canvas.js";

let winCount = 0;
let count = 0;
let chosenWord = "";

const options = document.getElementById("options");
const letterContainer = document.querySelector(".letter-container");
const newGamePopup = document.querySelector(".new-game-popup");
const newGameButton = newGamePopup.querySelector("button");

document.addEventListener("DOMContentLoaded", () => {
    displayOptions();
    createAlphabetButtons();
    drawInitialStructure();
    newGameButton.addEventListener("click", resetGame);
});

const displayOptions = () => {
    Object.keys(categories).forEach((category) => {
        const button = document.createElement("button");
        button.className = "category";
        button.textContent = category;
        button.addEventListener("click", () => selectWordForCategory(category));
        options.appendChild(button);
    });
};

const selectWordForCategory = (selectedCategory) => {
    const hiddenWord = document.getElementById("hidden-word");
    updateCategoryButtons(selectedCategory);
    letterContainer.classList.remove("hide");
    hiddenWord.textContent = "";

    if (!chosenWord) chosenWord = getRandomWord(selectedCategory);
    displayHiddenWord(hiddenWord);
};

const createAlphabetButtons = () => {
    const alphabet = Array.from({ length: 26 }, (_, i) =>
        String.fromCharCode(65 + i)
    );
    alphabet.forEach((letter) => {
        const button = document.createElement("button");
        button.className = "letter";
        button.textContent = letter;
        button.addEventListener("click", selectLetter);
        letterContainer.appendChild(button);
    });
};

const updateCategoryButtons = (selectedCategory) => {
    document.querySelectorAll(".category").forEach((button) => {
        button.textContent.toLowerCase() === selectedCategory
            ? button.classList.add("active")
            : (button.disabled = true);
    });
};

const getRandomWord = (category) => {
    const wordsArray = categories[category];
    const randomIndex = Math.floor(Math.random() * wordsArray.length);
    return wordsArray[randomIndex].toUpperCase();
};

const displayHiddenWord = (hiddenWordElement) => {
    hiddenWordElement.classList.add("active");
    hiddenWordElement.innerHTML = chosenWord
        .split("")
        .map(() => '<span class="dashes">-</span>')
        .join("");
};

const selectLetter = (e) => {
    const selectedLetter = e.target;
    const wordLetters = Array.from(chosenWord);
    const dashes = document.querySelectorAll(".dashes");

    if (wordLetters.includes(selectedLetter.textContent)) {
        revealLetters(wordLetters, selectedLetter.textContent, dashes);
        if (winCount === wordLetters.length) {
            displayResult(true);
        }
    } else {
        count++;
        drawMan(count);
        if (count === 6) {
            displayResult(false);
        }
    }
    selectedLetter.disabled = true;
};

const revealLetters = (wordLetters, letter, dashes) => {
    wordLetters.forEach((wordLetter, index) => {
        if (wordLetter === letter) {
            dashes[index].textContent = letter;
            winCount++;
        }
    });
};

const displayResult = (isWin) => {
    const h2 = document.querySelector("#result-text h2");
    h2.textContent = isWin ? "You Win!" : "You Lose";

    const p = document.querySelector("#result-text p");
    p.innerHTML = `The chosen word was ${chosenWord}`;
    disableGameControls();
};

const disableGameControls = () => {
    document.querySelector(".letter-container").style.pointerEvents = "none";
    setTimeout(() => newGamePopup.classList.remove("hide"), 500);
};

const drawMan = (count) => {
    const drawFunctions = [
        drawHead,
        drawBody,
        drawLeftArm,
        drawRightArm,
        drawLeftLeg,
        drawRightLeg,
    ];
    if (count > 0 && count <= drawFunctions.length) {
        drawFunctions[count - 1]();
    }
};

const resetGame = () => {
    winCount = 0;
    count = 0;
    chosenWord = "";

    document.getElementById("hidden-word").textContent = "";
    document.querySelector(".letter-container").style.pointerEvents = "all";

    options.innerHTML = "";
    letterContainer.innerHTML = "";
    letterContainer.classList.add("hide");
    newGamePopup.classList.add("hide");

    clearCanvas();

    displayOptions();
    createAlphabetButtons();
    drawInitialStructure();

    document
        .querySelectorAll(".category")
        .forEach((button) => (button.disabled = false));
};
