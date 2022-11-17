const express = require('express')
const db = require('./config/connection')
const port = 3001

const app = express()
app.use(express.json())


app.use('/' ,require('./routes'))

app.listen(port,()=>{
    console.log(`listening on http://localhost:${port}`)
})