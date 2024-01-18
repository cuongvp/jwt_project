const express = require('express')
const { GenerateJWT, VerifyJWT, verifyAccessToken, signAccessToken } = require('./services/jwt.service')
require('dotenv').config()

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


const port = 3000
app.listen(port, () => {
    console.log(`App is listening at port: ${port}`)
})