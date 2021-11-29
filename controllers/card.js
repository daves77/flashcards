import express from "express";
import { multerUpload } from "../utils/multer.js";
import pool from "../store.js";

const cardsRouter = express.Router();

cardsRouter.get("/", (req, res) => {
    pool.query(
        "select c.id, c.name, c.description, array_agg(t.name) as tags from collections c left join collections_tags ct on c.id=ct.collection_id left join tags t on ct.tag_id = t.id group by c.id"
    )
        .then((result) => {
            const collections = result.rows;

            res.render("cards/collections", { collections });
        })
        .catch((err) => console.log(err));
});

cardsRouter.get("/create", (req, res) => {
    res.render("cards/create-card");
});

// post request to create card
cardsRouter.post("/create", (req, res) => {
    //receives the card information as a string.
    //save card information as string
    //create card in DB
    // pool.query('INSERT INTO collections_card (front, back) ')
    // console.log(req.body, "create card post");
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

cardsRouter.get("/view/:id", (req, res) => {
    const { id } = req.params;
    pool.query("SELECT * FROM cards")
        .then((result) => {
            console.log(result.rows[0]);
        })
        .catch((err) => console.log(err));
});

export default cardsRouter;
