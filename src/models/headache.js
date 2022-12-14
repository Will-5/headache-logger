const mongoose = require('mongoose')

const headacheSchema = new mongoose.Schema({
    description: {
        type: String,
        required: true,
        trim: true,
        maxLength: 150
    },
    duration: {
        type: String,
        required: true,
        trim: true,
        maxLength: 20
    },
    remedyWorked: {
        type: Boolean,
        default: false
    },
    remedy: [{
        type: String,
        default: "nenhum",
        trim: true,
        maxLength: 25
    }],
    trigger: {
        type: String,
        required: true,
        trim: true,
        maxLength: 25
    },
    intensity: {
        type: Number,
        required: true,
        trim: true,
        validate(value){
            if(value < 1 || value > 10) {
                throw new Error('Intensidade precisa estar entre 1 e 10')
            }
        }
    },
    headacheStartDate: {
        type: Date,
        required: true,
        trim: true,
        max: [new Date(new Date().setHours(new Date().getHours() + 3)), "ERRO no cadastro de dor de cabeça. Não selecione data futura"]
    },
    
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    }
},{
    timestamps: true
})

const Headache = mongoose.model('Headache', headacheSchema)

module.exports = Headache