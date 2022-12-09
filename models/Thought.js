const {Schema, Types, model} = require('mongoose')
const ReactionSchema = require('./Reaction')
const moment = require('moment')

const thoughtSchema = new Schema({
    thoughtText : {
        type:String,
        required: true,
        minLenght: 1,
        maxLenght:280

    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: (createdAtVal) => moment(createdAtVal).format('MMM DD, YYYY [at] hh:mm a')
        
    },
    username: {
        type: String,
        require:true
    },
reactions: [ReactionSchema]
},
{
    toJSON:{
        virtuals:true,
        getters:true
    },
    id:false
})
thoughtSchema.virtual('reactionCount').get(function () {
    return this.reactions.length;
});

const Thought = model("Thought",thoughtSchema)

module.exports = Thought


