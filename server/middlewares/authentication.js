const { verify } = require('../helpers/jwt');
function authentication(req, res, next) {
    let access_token = req.headers.access_token;
    if (access_token) {
        console.log('dari authen access_token', req.headers)
        let decoded = verify(req.headers.access_token);
        req.CustomerId = decoded.CustomerId;
        req.CustomerEmail = decoded.CustomerEmail;
        next();
    } else {
        throw {msg: `Don't have access`, status: 401};
    }
}

module.exports = authentication