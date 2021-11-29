import express from "express";
import methodOverride from "method-override";
import dotenv from "dotenv";
import sessions from "express-session";

import middleware from "./utils/middleware.js";
import homeRouter from "./controllers/home.js";
import userRouter from "./controllers/users.js";
import cardsRouter from "./controllers/card.js";

dotenv.config();
const app = express();

const PORT = process.env.PORT || 3004;

app.set("view engine", "ejs");

app.use(express.static("public"));
app.use(methodOverride("_method"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(
    sessions({
        secret: process.env.SECRET,
        saveUninitialized: true,
        resave: false,
        cookies: { maxAge: 1000 * 60 * 60 * 24 * 365 },
    })
);

app.use(middleware.logger);
app.use(middleware.checkUser);

app.use("/", homeRouter);
app.use("/", userRouter);
app.use("/collections", cardsRouter);

app.listen(PORT, () => console.log(`listening at port ${PORT}`));
