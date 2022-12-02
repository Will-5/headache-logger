const mongoose = require('mongoose')

const remedySchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        default: "nenhum",
        ref: "Headache"
    },
},{
    timestamp: true
})

const Remedy = mongoose.model('Remedy', remedySchema)

module.exports = Remedy