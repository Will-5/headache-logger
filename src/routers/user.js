const express = require('express')
const router = new express.Router()
const auth = require('../middleware/auth')
const User = require('../models/user')

//sign up user
router.post('/users', async (req, res) => {
    const user = new User(req.body)
    try {

        await user.save()
        const token = await user.generateAuthToken()

        res.status(201).send({ user: user, token: token })

    } catch (e) {

        res.status(400).send(e)
    }
})

// login user
router.post('/users/login', async (req, res) => {

    try {

        const user = await User.findByCredentials(req.body.email, req.body.password)
        const token = await user.generateAuthToken()

        res.cookie("Token", token, { maxAge: 5000000 })

        res.status(200).send(user)

    } catch (e) {
        console.log(e)
        res.status(400).json(e)
    }
})

// logout user (single session)
router.post('/users/logout', auth, async (req, res) => {
    try {

        req.user.tokens = req.user.tokens.filter((token) => {
            return token.token !== req.token
        })

        await req.user.save()

        res.send()
    } catch (e) {
        res.status(500).send()
    }
})

// logout user (all sessions)
router.post('/users/logout_all', auth, async (req, res) => {
    try {
        req.user.tokens = []
        await req.user.save()

        res.send()
    } catch (e) {
        res.status(500).send()
    }
})


//get me
router.get('/users/me', auth, async (req, res) => {
    res.send(req.user)
})


//update user
router.patch('/users/me', auth, async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['name', 'email', 'password', 'age']
    const isValidOp = updates.every((update) => allowedUpdates.includes(update))

    if (!isValidOp) {
        return res.status(400).send({ error: 'Invalid operation' })
    }

    try {
        const user = req.user

        updates.forEach((update) => {
            user[updates] = req.body[update]
        })

        await user.save()
        res.send(user)
    } catch (e) {
        res.status(400).send(e)
    }
})

//delete user
router.delete('/users/me', auth, async (req, res) => {
    try {
        await req.user.remove()
        res.send(req.user)
    } catch (e) {
        res.status(500).send()
    }
})

module.exports = router