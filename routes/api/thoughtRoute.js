const router = require('express').Router()
const Thought = require('../../models/Thought')
const User = require('../../models/User')

router.route('/')
.get((req,res)=>{
    Thought.find({}).then(data=>res.json(data))
})
.post((req,res)=>{
   Thought.create(req.body).then(data=>{
    res.status(200).json(data)
   }).catch(err=>{
    res.status(500).json({message:'server error'})
   })
})


router.route('/:id')
.get((req,res)=>{
    Thought.findById({_id:req.params.id}).then(data=>res.status(200).json(data))
})
.post((req,res)=>{
    res.json(req.body)
})
.put((req,res)=>{
    Thought.findOneAndUpdate({_id:req.params.id}).then(data=>res.status(200).json(data))
})
.delete((req,res)=>{
    Thought.findOneAndDelete({_id:req.params.id}).then(data=>res.status(200).json(data))
})



module.exports = router