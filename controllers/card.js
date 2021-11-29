import express from "express";
import { multerUpload } from "../utils/multer.js";
import pool from "../store.js";

const cardsRouter = express.Router();

//gets all collections
cardsRouter.get("/", (req, res) => {
    pool.query(
        "select c.id, c.name, c.description, array_agg(t.name) as tags from collections c left join collections_tags ct on c.id=ct.collection_id left join tags t on ct.tag_id = t.id group by c.id"
    )
        .then((result) => {
            const collections = result.rows;

            res.render("cards/collections", { collections });
            //TODO: get number of cards in a collection
        })
        .catch((err) => console.log(err));
});

//create a new collection folder
cardsRouter.post("/create", (req, res) => {
    //TODO: refactor to optimise db queries
    console.log(req.body);
    const { name } = req.body;
    const { description } = req.body;
    const { tags } = req.body;

    pool.query(
        "INSERT INTO collections (user_id, name, description) VALUES (1, $1, $2) RETURNING *",
        [name, description]
    ).then((result) => {
        const newCollection = result.rows[0];
        tags.forEach((tag) => {
            const query =
                "with s as (select id, name from tags where name=$1), i as (insert into tags (name) select $1 where not exists (select 1 from s) returning id, name) select id, name from i union all select id, name from s";
            pool.query(query, [tag])
                .then((result) => {
                    const { id } = result.rows[0];
                    pool.query(
                        "insert into collections_tags (collection_id, tag_id) values ($1, $2)",
                        [newCollection.id, id]
                    );
                })
                .catch((err) => console.log(err.stack));
        });

        setTimeout(() => {
            res.redirect("/collections");
        }, 500);
    });
});

//gets the cards from a collection
cardsRouter.get("/:id", (req, res) => {
    const { id } = req.params;
});

cardsRouter.get("/cards/create", (req, res) => {
    res.render("cards/create-card");
});

// post request to create card
cardsRouter.post("/cards/create", (req, res) => {
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
