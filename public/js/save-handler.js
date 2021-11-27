import { editor } from "./editor.mjs";

const saveButton = document.getElementById("save-btn");
const output = document.getElementById("output");

saveButton.addEventListener("click", () => {
    editor.save().then((savedData) => {
        output.innerHTML = JSON.stringify(savedData, null, 4);
    });
});
