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
            res.redirect("back");
        }, 0);
    });
});

//gets the cards from a collection
cardsRouter.get("/:id", (req, res) => {
    const { id } = req.params;
    pool.query(
        "select collections_id, collections.name as collection_name, cards_id, cards.content from collections_cards inner join cards on cards_id=cards.id inner join collections on collections_id=collections.id where collections_id=$1",
        [id]
    ).then((result) => {
        const cards = result.rows;
        console.log(cards);
        console.log(cards[0].content);
        res.render("cards/card-list", { cards, id });
    });
});

cardsRouter.get("/:id/cards/create", (req, res) => {
    res.render("cards/create-card");
});

// post request to create card
cardsRouter.post("/:id/cards/create", (req, res) => {
    // receives the card information as a string.
    // save card information as string
    // create card in DB
    const collectionId = req.params.id;
    console.log(req.body);
    pool.query("INSERT INTO cards (content) VALUES ($1) RETURNING *", [
        JSON.stringify(req.body),
    ])
        .then((result) => {
            const card = result.rows[0];
            return pool.query(
                "INSERT INTO collections_cards (collections_id, cards_id) VALUES ($1, $2)",
                [collectionId, card.id]
            );
        })
        .then((result) => {
            res.status(301).redirect(`/collections/${collectionId}`);
        })
        .catch((err) => {
            console.log(err.stack);
        });
});

cardsRouter.post("/cards/images", multerUpload.single("image"), (req, res) => {
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

cardsRouter.get("/cards/:cardId", (req, res) => {
    const { cardId } = req.params;

    pool.query("select * from cards where id=$1", [cardId])
        .then((result) => {
            const card = result.rows[0];
            const content = card.content;
            console.log(JSON.stringify(content));

            res.status(200).json(content);
        })
        .catch((err) => console.log(err));
});

cardsRouter.get("/:collectonId/view/:cardId", (req, res) => {
    const { collectionId } = req.params;
    res.render("cards/view-card");
});

export default cardsRouter;
