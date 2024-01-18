const jwt = require('jsonwebtoken')
require('dotenv')

const GenerateJWT = async (payload, sig, options) => {
    var token = jwt.sign(payload, sig, options);
    return token
}

const VerifyJWT = async (token, key) => {
    const decode = jwt.verify(token, key, (err, decoded) => {
        if(err){
            return err
        }
        return decoded
    })
    return decode
}

const signAccessToken = async (payload) => {
    const options = {
        expiresIn: '1m'
    }
    var token = jwt.sign(payload, process.env.ACCESS_TOKEN, options)
    return token
}
 
const signRefreshToken = async (payload) => {
    const options = {
        expiresIn: '5m'
    }
    var token = jwt.sign(payload, process.env.REFRESH_TOKEN, options)
    return token
}

const verifyAccessToken = async (token) => {
    const decode = jwt.verify(token, process.env.ACCESS_TOKEN, (err, decoded) => {
        if(err){
            return err
        }
        return decoded
    })
    return decode
}

const verifyRefressToken = async (token) => {
    const decode = jwt.verify(token, process.env.REFRESH_TOKEN, (err, decoded) => {
        if(err){
            return err
        }
        return decoded
    })
    return decode
}


module.exports = {
    GenerateJWT,
    VerifyJWT,
    signAccessToken,
    signRefreshToken,
    verifyAccessToken,
    verifyRefressToken
}