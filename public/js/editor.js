const ImageTool = window.ImageTool;

const editor = new EditorJS({
    holder: "editorjs",
    tools: {
        header: {
            class: Header,
            config: {
                placeholder: "Enter a Header",
                levels: [1, 2, 3, 4, 5, 6],
                defaultLevel: 1,
            },
        },
        image: {
            class: ImageTool,
            config: {
                endpoints: {
                    byFile: "http://localhost:3001/cards/images",
                },
            },
        },
    },
});
