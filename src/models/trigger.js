const mongoose = require('mongoose')

const triggerSchema = new mongoose.Schema({
    trigger:{
        type: String,
        required: true,
    },/*
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Headache"
    }*/
},{
    timestamp: true
})

const Trigger = mongoose.model('Trigger', triggerSchema)

module.exports = Trigger