const logger = (req, res, next) => {
    console.log("Method:", req.method);
    console.log("Body:", req.body);
    console.log(req);
    next();
};

export default { logger };
