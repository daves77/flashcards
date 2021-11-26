import express from "express";
import methodOverride from "method-override";
import dotenv from "dotenv";

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

app.use(middleware.logger);

app.use("/", homeRouter);
app.use("/", userRouter);
app.use("/cards", cardsRouter);

app.listen(PORT, () => console.log(`listening at port ${PORT}`));
