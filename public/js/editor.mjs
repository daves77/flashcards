const ImageTool = window.ImageTool;

export const editor = new EditorJS({
    holder: "editorjs",
    placeholder: "New Note",
    tools: {
        header: {
            class: Header,
            config: {
                placeholder: "Enter a Header",
                levels: [2, 3, 4, 5, 6],
                defaultLevel: 3,
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
        code: CodeTool,
    },
});
