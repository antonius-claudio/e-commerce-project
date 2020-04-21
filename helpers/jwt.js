const jwt = require('jsonwebtoken');

function sign (obj) {
    return jwt.sign(obj, process.env.secret);
}

function verify (access_token) {
    return jwt.verify(access_token, process.env.secret);
}

module.exports = { sign, verify }