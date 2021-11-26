import express from "express";
import bcrypt from "bcrypt";

import pool from "../store.js";
import { hash } from "../utils/hash.js";

const userRouter = express.Router();

//get signup page
userRouter.get("/signup", (req, res) => {
    res.render("users/signup");
});

//post signup form
userRouter.post("/signup", (req, res) => {
    const { email } = req.body;
    const { password } = req.body;
    const passwordHashed = hash(password);

    pool.query("INSERT INTO users (email, password_hash) VALUES ($1, $2)", [
        email,
        passwordHashed,
    ])
        .then((result) => {
            console.log(result.rows);
            res.render("users/login");
        })
        .catch((err) => console.log(err));
});

// get login page
userRouter.get("/login", (req, res) => {
    res.render("users/login");
});

//post login form
userRouter.post("/login", (req, res) => {
    const { email } = req.body;
    const { password } = req.body;

    pool.query("SELECT * FROM users where email=$1", [email])
        .then((result) => {
            const passwordCorrect = bcrypt.compareSync(
                password,
                result.rows[0].password_hash
            );

            if (passwordCorrect) {
                console.log("correct !");
            } else {
                console.log("wrong");
            }
            res.render("home");
        })
        .catch((err) => console.log(err));
});

export default userRouter;
