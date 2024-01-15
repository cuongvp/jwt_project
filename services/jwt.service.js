const jwt = require('jsonwebtoken')

const GenerateJWT = async (payload, sig) => {
    var token = jwt.sign(payload, sig);
    return token
}


module.exports = {
    GenerateJWT
}