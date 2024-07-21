const errorHandle = (API) => {
    return(req, res, next) => {
        API(req, res, next).catch((err) => {
            res.status(500).json({
                message: "internal server error",
                error: err.message,
                stack: err.stack
            });
        });
    };
}; 

module.exports = { errorHandle };