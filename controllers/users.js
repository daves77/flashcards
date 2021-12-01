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
    res.render("users/login", { user: null });
});

//post login form
userRouter.post("/login", (req, res) => {
    const { email } = req.body;
    const { password } = req.body;

    pool.query("SELECT * FROM users where email=$1", [email])
        .then((result) => {
            const user = result.rows[0];
            const passwordCorrect = bcrypt.compareSync(
                password,
                user.password_hash
            );

            if (passwordCorrect) {
                req.session.user = user;
                console.log("correct !");
            } else {
                //TODO: add error notification
                console.log("wrong");
            }
            res.redirect("/collections");
        })
        .catch((err) => console.log(err));
});

//user logout
userRouter.post("/logout", (req, res) => {
    req.session.destroy();
    res.redirect("/collections");
});

export default userRouter;
