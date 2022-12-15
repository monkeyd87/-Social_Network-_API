const { application } = require('express')

const router = require('express').Router()


router.use('/users',require('./userRoute'))
router.use('/thoughts',require('./thoughtRoute'))
router.route('/')
.get((req,res)=>{
    res.send('you made it to the api route')
})
.post((req,res)=>{
    res.json(req.body)
})



module.exports = router