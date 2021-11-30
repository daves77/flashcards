const ImageTool = window.ImageTool;

const id = window.location.href.split("/")[6];
const response = await axios.get(
    `http://localhost:3001/collections/cards/${id}`
);

export const editor = new EditorJS({
    holder: "editorjs",
    readOnly: true,
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
                    byFile: "http://localhost:3001/collections/cards/images",
                },
            },
        },
        code: CodeTool,
    },
    data: {
        time: new Date(),
        blocks: response.data,
    },
});
