const router = require('express').Router()

router.route('/')
.get((req,res)=>{
    res.send('made it to thought api route')
})
.post((req,res)=>{
    res.json(req.body)
})


router.route('/:id')
.get((req,res)=>{
    res.send(req.params.id)
})
.post((req,res)=>{
    res.json(req.body)
})
.put((req,res)=>{
    res.json(req.body)
})
.delete((req,res)=>{
    res.json({message:`${req.params.id} has been deleted`})
})

module.exports = router