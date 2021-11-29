const logger = (req, res, next) => {
    console.log("Method:", req.method);
    console.log("Body:", req.body);
    next();
};

const checkUser = (req, res, next) => {
    //check if user auth
    console.log(req.session);
    next();
};

export default { logger, checkUser };
