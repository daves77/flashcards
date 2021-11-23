import express from "express";
import { marked } from "marked";

const homeRouter = express.Router();

homeRouter.get("/", (req, res) => {
    res.render("home");
});

homeRouter.post("/", (req, res) => {
    console.log(req.body);
    const html = marked.parse(req.body.markdown);

    console.log(html);
});

export default homeRouter;
