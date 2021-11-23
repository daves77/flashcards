import express from "express";
const userRouter = express.Router();

// get login page
userRouter.get("/login", (req, res) => {
    res.render("users/login");
});

export default userRouter;
