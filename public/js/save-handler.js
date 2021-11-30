import { editor } from "./editor.mjs";

const saveButton = document.getElementById("save-btn");

const config = {
    headers: {
        "Content-Type": "application/json",
    },
};

saveButton.addEventListener("click", () => {
    editor.save().then(async (savedData) => {
        console.log(savedData);
        const id = window.location.href.split("/")[4];
        await axios.post(
            `http://localhost:3001/collections/${id}/cards/create`,
            JSON.stringify(savedData.blocks),
            config
        );

        window.history.back();
    });
});
