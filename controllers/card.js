import express from "express";
import { multerUpload } from "../utils/multer.js";

const cardsRouter = express.Router();

cardsRouter.get("/create", (req, res) => {
    res.render("cards/create-card");
});

cardsRouter.post("/images", multerUpload.single("image"), (req, res) => {
    console.log(req.file);

    res.send({
        success: 1,
        file: {
            url: "https://www.tesla.com/tesla_theme/assets/img/_vehicle_redesign/roadster_and_semi/roadster/hero.jpg",
        },
    });
});

export default cardsRouter;
