const express = require('express')
const Trigger = require('../models/trigger')
const router = new express.Router()

router.get('/triggers', async (req, res) => {
    
    Trigger.find({}).sort({event: 1}).then((trigger) => {
        res.status(201).send(trigger)
    }).catch((e) => {
        res.status(500).send()
    })
})

router.post('/triggers', async (req, res) => {
    const trigger = new Trigger(req.body)

    trigger.save().then(() => {
        res.status(201).send(trigger)
    }).catch((e) => {
        res.status(500).send()
    })
})

module.exports = router