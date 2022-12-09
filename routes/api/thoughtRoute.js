const router = require('express').Router()
const Thought = require('../../models/Thought')
const User = require('../../models/User')

router.route('/')
.get((req,res)=>{
    Thought.find({}).then(data=>{
        if(!data){
            res.status(404).json({message:'no thought founds'})
        }else{
            res.status(200).json(data)
        }
    })
})
.post((rea,res)=>{
    Thought.create(req.body).then(data=>{
        if(!data) res.status(404).json({message:'error'}) 
        return
    })
})



router.route('/:id')
.get((req,res)=>{
    Thought.findOne({ _id: req.params.id })
    .select('-__v')
    .then((thought) => res.json(thought))
    .catch((err) => res.status(400).json(err))
})
.put((req,res)=>{
    Thought.findOneAndUpdate(
        { _id: req.params.id },
        { $set: req.body },
        { runValidators: true, new: true }
    ).then((data) => {
            if (!data) {
                res.status(404).json({ message: 'Error' });

            }else{

                res.json(data);
            }
        }).catch(err => res.status(400).json({message:'server error'}));
})
.delete((req,res)=>{
    Thought.findOneAndDelete({ _id: req.params.id })
    .then(deletedThought => {
        if (!deletedThought) {
            return res.status(404).json({ message: "Error" });
        }
        return User.findOneAndDelete(
            { _id: req.params.id },
            { $pull: { thoughts: req.params.id } },
            { new: true }
        );
    })
    .then(data => {
        if (!data) {
            res.status(404).json({ message: "Error" });
            return;
        }
        res.json(data);
    })
    .catch(err => res.status(400).json(err));
})


router.route('/:id/reactions')
.post((req,res)=>{
    Thought.findByIdAndUpdate(
        {_id:req.params.id},
        { $addToSet: { reactions: req.body } },
        { new: true, runValidators: true }
    ).then(data=>{
        if(!data){
            res.status(404).json({message:'Error'})
        }else{
            res.json(data)
        }
}).catch(err => res.status(400).json({message:'server error'}))
})
    

router.route('/:thoughtId/reactions/:reactionId')
.delete((req,res)=>{
    Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $pull: { reactions: { reactionId: req.params.reactionId } } },
        { new: true, runValidators: true }
    )
        .then((thought) => {
            if (!thought) {
                return res.status(404).json({ message: 'No reaction with that id!' });
            }
            res.json(thought);
        })
        .catch((err) => {
            res.status(500).json({message:"server error"});
        })
})



module.exports = router