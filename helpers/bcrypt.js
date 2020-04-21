const bcrypt = require('bcrypt');
const rounds = bcrypt.genSaltSync(Number(process.env.rounds)); /////penting kasih number
function hash (password){
    return bcrypt.hashSync(password, rounds);
}

function compare (password, hashedPass) {
    return bcrypt.compareSync(password, hashedPass);
}

module.exports = { hash, compare }