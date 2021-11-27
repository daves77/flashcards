class MyParagraph {
    constructor({ data, api }) {
        this.api = api;
    }

    refreshContent() {
        this.api.blocks.render({
            blocks: [
                {
                    type: "header",
                    data: {
                        text: "new note",
                        level: 1,
                    },
                },
            ],
        });
    }
}

export default MyParagraph;
