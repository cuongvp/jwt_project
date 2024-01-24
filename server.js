const express = require('express')
const { GenerateJWT, VerifyJWT, verifyAccessToken, signAccessToken } = require('./services/jwt.service')
require('dotenv').config()
const bcrypt = require('bcryptjs')
const crypto = require('crypto')
const jwt = require('jsonwebtoken')

const app = express()
app.use(express.json())

const SECRET_KEY = process.env.SECRET_KEY

app.get('/', async (req, res) => {

    const data = {
        name: 'cuongvp 123'
    }

    const token = await signAccessToken(data)
    res.header('Authorization', 'Bearer '+ token)
    res.send(token)
})

app.get('/test', async (req, res) => {

    const { privateKey, publicKey } = crypto.generateKeyPairSync('rsa', {
        modulusLength: 4096,
        publicKeyEncoding: {
            type: 'pkcs1',
            format: 'pem'
        },
        privateKeyEncoding: {
            type: 'pkcs1',
            format: 'pem'
        }
    })

    const payload = {
        username: 'phucuong.vo'
    }

    let data = undefined

    try{
        const accessToken = await jwt.sign(payload, privateKey, {
            algorithm: 'RS256',
            expiresIn: '2 days'
        })

        const refreshToken = await jwt.sign( payload, privateKey, {
            algorithm: 'RS256',
            expiresIn: '7 days'
        })

        jwt.verify(accessToken, publicKey, (err, decode) => {
            if(err){
                console.error(`error verify:: ${err}`)
            }else{
                data = decode
                console.log(`decode verify:: ${decode}`)
            }
        })

        console.log({accessToken, refreshToken})
    }
    catch(err){
        data = err.message
    }

    res.send(data)
})

app.post('/verify', async (req, res) => {

    if(!req.headers['authorization']){
        return res.send({
            error: 'do not have token'
        }) 
    }
    
    const authHeader = req.headers['authorization']
    const bearerToken = authHeader.split(' ')
    const token = bearerToken[1]
   
    if(token){
        const decode = await verifyAccessToken(token)
        return res.send({
            data: decode
        })
    }
})


const port = 5000
app.listen(port, () => {
    console.log(`App is listening at port: ${port}`)
})