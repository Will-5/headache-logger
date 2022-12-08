const mongoose = require('mongoose')
const validator = require('validator');
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    age: {
        type: Number,
        default: 0,
        validate (value) {
            if (value < 0){
                throw new Error('idade precisa ser positiva')
            }
        }
    },
    email: {
        type: String,
        unique: true,
        required: true,
        trim: true,
        lowercase: true,

        validate (value) {
            if (!validator.isEmail(value)) {
                throw new Error('Email inválido')
            }
        }
    },
    password: {
        type: String,
        required: true,
        trim: true,
        minLength: [6, 'senha muito curta'],
        validate (value) {
            if(value.toLowerCase().includes("senha")){
                throw new Error('Senha não pode conter palavra "senha"')
            }
        }
    },
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }]
},{
    timestamps: true
})

//virtual property - propriedade de relação entre user e headache
userSchema.virtual('headaches', {
    ref: 'Headache',
    localField: '_id',
    foreignField: 'owner'
})

//métodos que usam a instância em si, e não o modelo de user, precisam ser criados como function - eles usam o this
userSchema.methods.toJSON = function () {
    const user = this
    const userObject = user.toObject()

    delete userObject.password
    delete userObject.tokens

    return userObject
}

userSchema.methods.generateAuthToken = async function () {
    const user = this
    const token = jwt.sign({_id: user._id.toString()}, 'rabanete', {expiresIn: '7 days' })

    user.tokens = user.tokens.concat({ token: token })
    await user.save()

    return token
}

userSchema.statics.findByCredentials = async (email, password) => {
    const user = await User.findOne({email: email})

    if (!user){
        throw new Error('Não foi possível logar')
    }

    const isMatch = await bcrypt.compare(password, user.password)

    if(!isMatch){
        throw new Error('Não foi possível logar')
    }
    return user
}

// hash plaintext password before saving
userSchema.pre('save', async function (next){
    const user = this
    
    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8)
    }


    next()
})

//delete headaches when user is removed
userSchema.pre('remove', async function (next) {
    const user = this
    await headache.deleteMany({ owner: user._id })
    next()
})

const User = mongoose.model('User', userSchema)

module.exports = User
