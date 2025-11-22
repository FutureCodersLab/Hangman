import { categories } from "./words.js";

const categoryContainer = document.getElementById("category-container");

document.addEventListener("DOMContentLoaded", () => {
    const categoriesArray = Object.keys(categories);

    categoriesArray.forEach((category) => {
        const button = document.createElement("button");
        button.className = "category";
        button.textContent = category;
        categoryContainer.appendChild(button);
    });
});
