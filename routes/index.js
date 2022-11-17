const router = require('express').Router()
router.use('/api',require('./api'))
router.route('/')
.get((req,res)=>{
    res.send('you made it')
})




module.exports=router
