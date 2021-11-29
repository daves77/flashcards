import { editor } from "./editor.mjs";

const saveButton = document.getElementById("save-btn");

const config = {
    headers: {
        "Content-Type": "application/json",
    },
};

saveButton.addEventListener("click", () => {
    editor.save().then((savedData) => {
        console.log(savedData);
        axios.post(
            "http://localhost:3001/cards/create",
            JSON.stringify(savedData.blocks),
            config
        );
    });
});
