const router = require('express').Router()
const User = require('../../models/User')

router.route('/')
.get((req,res)=>{
    User.find({}).then(data=>{
        if(!data){
            res.status(404).json({message:' you must be lost'})
        }else{
            res.json(data)
        }
    })
})
.post((req,res)=>{
    User.create(req.body).then(data =>{
        res.status(200).json(data)
    }).catch(err=>{
        res.json({message:'error'})
    })
})


router.route('/:id')
.get((req,res)=>{
   User.findById({_id:req.params.id}).then(data=>{
    if(!data){
        res.status(404).json({message: 'you must be lost'})
    }else{
        res.json(data)
    }
   })
})
.put((req,res)=>{
   User.findByIdAndUpdate({_id:req.params.id},req.body).then(data=>{
    if(!data){
        console.log("error something went wrong")
        res.status(404).json({message:"User not found"})
    }else{
        res.status(200).json(data)
    }
   })
})
.delete((req,res)=>{
    User.findOneAndDelete({_id:req.params.id}).then(data=>{
        if(!data) {
            res.status(404).json({message:"user not found"})
            return
        }
        res.status(200).json(data)
    }).catch(err=>{
        res.status(500).json({message:"server error"})
    })
})


router.route('/:id/friends/:friendId')
.put((req,res)=>{
        User.findOneAndUpdate(
            { _id: req.params.id },
            { $addToSet: { friends: req.params.friendId } },
            { runValidators: true, new: true }
        ).then(data=>{
            if(!data){
                res.status(404).json({message:'User no found'})
            }else{
                res.status(200).json(data)
            }
        }).catch((req,res)=>{
            res.status(500).json({message:'Server error'})
        })
    },)
.delete((req,res)=>{
    User.findOneAndUpdate(
        { _id: req.params.id },
        { $pull: { friends: req.params.friendId } },
        { new: true }
    )
        .then(data=>{
            if(!data){
                res.status(404).json({message:'User no found'})
            }else{
                res.status(200).json(data)
            }
        }).catch(data=>{
            res.status(500).json({message:'Server error'})
        })
});

module.exports = router