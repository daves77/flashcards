import express from "express";
import { marked } from "marked";

const homeRouter = express.Router();

homeRouter.get("/", (req, res) => {
    res.render("home", req.session.user);
});

homeRouter.post("/", (req, res) => {
    console.log(req.body);
});

export default homeRouter;
