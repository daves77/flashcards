const reader = new commonmark.Parser();
const writer = new commonmark.HtmlRenderer();

document
    .getElementById("markdown-input")
    .addEventListener("keydown", function (e) {
        if (e.key == "Tab") {
            e.preventDefault();
            var start = this.selectionStart;
            var end = this.selectionEnd;

            // set textarea value to: text before caret + tab + text after caret
            this.value =
                this.value.substring(0, start) +
                "\t" +
                this.value.substring(end);

            // put caret at right position again
            this.selectionStart = this.selectionEnd = start + 1;
        }
    });

const run = () => {
    const markdownInput = document.getElementById("markdown-input");

    const parsed = reader.parse(markdownInput.value);
    const result = writer.render(parsed);

    const markdown = document.getElementById("markdown");
    markdown.innerHTML = result;
};
