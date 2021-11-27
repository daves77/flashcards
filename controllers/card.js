import express from "express";
import { multerUpload } from "../utils/multer.js";

const cardsRouter = express.Router();

cardsRouter.get("/create", (req, res) => {
    res.render("cards/create-card");
});

cardsRouter.post("/images", multerUpload.single("image"), (req, res) => {
    console.log(req.file);
    const path = `/uploads/${req.file.filename}`;
    console.log(path);
    res.send({
        success: 1,
        file: {
            url: path,
        },
    });
});

export default cardsRouter;
