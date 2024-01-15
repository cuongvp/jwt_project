const express = require('express')
const { GenerateJWT } = require('./services/jwt.service')
const app = express()

app.get('/', async (req, res) => {
    const token = await GenerateJWT({ name: 'cuongvp 123'}, 'phu cuong')
    console.log(token)
    res.send(token)
})


const port = 3000
app.listen(port, () => {
    console.log(`App is listening at port: ${port}`)
})