function errorHandler(err, req, res, next) {
    let status = 500;
    let message = ['Internal server error'];
    if (err.errors) {
        status = 400;
        message = [];
        err.errors.forEach(e => {
            message.push(e.message);
        });
    }
    if (err.msg) {
        status = 404;
        message = [];
        message.push(err.msg);
        if (err.status) {
            status = err.status;
        }
    }
    res.status(status).json({message});
}

module.exports = errorHandler;