const {Schema, Types, model} = require('mongoose')
const ReactionSchema = require('./Reaction');

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
        get: date => dateFormat(date)
    },
    username: {
        type: String,
        require:true
    },
    reactiong: [reactionSchema]
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

const Thought = model(Thought,thoughtSchema)

module.exports = Thought


