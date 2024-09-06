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
const letterContainer = document.getElementById("letter-container");
const newGameContainer = document.getElementById("new-game-container");
const newGameButton = document.getElementById("new-game-button");
const resultText = document.getElementById("result-text");

document.addEventListener("DOMContentLoaded", () => {
    displayOptions();
    createAlphabetButtons();
    drawInitialStructure();
    newGameButton.addEventListener("click", resetGame);
});

const displayOptions = () => {
    Object.keys(categories).forEach((category) => {
        const button = createCategoryButton(category);
        options.appendChild(button);
    });
};

const createCategoryButton = (category) => {
    const button = document.createElement("button");
    button.className = "category";
    button.textContent = category;
    button.addEventListener("click", () => selectWordForCategory(category));
    return button;
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

const selectWordForCategory = (selectedCategory) => {
    const hiddenWord = document.getElementById("hidden-word");
    updateCategoryButtons(selectedCategory);
    letterContainer.classList.remove("hide");
    hiddenWord.textContent = "";

    chosenWord = getRandomWord(selectedCategory);
    displayHiddenWord(hiddenWord);
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
    resultText.innerHTML = `
        <h2 class="${isWin ? "win" : "lose"}">${
        isWin ? "You Win!" : "You Lose!"
    }</h2>
        <p>The word was <span>${chosenWord}</span></p>
    `;
    disableGameControls();
};

const disableGameControls = () => {
    document
        .querySelectorAll(".category, .letter")
        .forEach((button) => (button.disabled = true));
    newGameContainer.classList.remove("hide");
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

    options.innerHTML = "";
    letterContainer.innerHTML = "";
    letterContainer.classList.add("hide");
    resultText.innerHTML = "";
    newGameContainer.classList.add("hide");

    clearCanvas();

    displayOptions();
    createAlphabetButtons();
    drawInitialStructure();

    document
        .querySelectorAll(".category")
        .forEach((button) => (button.disabled = false));
};
