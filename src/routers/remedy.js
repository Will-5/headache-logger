const express = require('express')
const Remedy = require('../models/remedy')
const router = new express.Router()

router.get('/remedies', async (req, res) => {
    
    Remedy.find({}).sort({name: 1}).then((remedy) => {
        res.status(201).send(remedy)
    }).catch((e) => {
        res.status(500).send()
    })
})

router.post('/remedies', async (req, res) => {
    const remedy = new Remedy(req.body)

    remedy.save().then(() => {
        res.status(201).send(remedy)
    }).catch((e) => {
        res.status(500).send()
    })
})

module.exports = router