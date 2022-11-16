const express = require('express')
const port = 3001

const app = express()
app.use(express.json())


app.use('/')

app.listen(port,()=>{
    console.log(`listening on http://localhost:${port}`)
})