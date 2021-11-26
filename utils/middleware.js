const logger = (req, res, next) => {
    console.log("Method:", req.method);
    console.log("Body:", req.body);
    next();
};

export default { logger };
