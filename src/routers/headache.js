const express = require('express')
const Headache = require('../models/headache')
const router = new express.Router()
const auth = require('../middleware/auth')

router.post('/headaches',auth ,async (req, res) => {
    
    const token = req.cookies?.Token
    const payLoad = token.split('.')[1]
    const decodedPayLoad = atob(payLoad)
    const userData = JSON.parse(decodedPayLoad)


    // operador ... é o de spread - ele traz todo o objeto da request
    const headache = new Headache({
        ...req.body,
        owner: userData._id
    })
    console.log(req.body)

    try {
        await headache.save()
        res.status(201).send(headache)
    } catch(e) {
        res.status(400).send(e)
    }
})

//get all headache

//filtro -> /headache?complete=true
//paginação -> /headache?limit=10&skip=0
//ordenação -> /headache?sortBy=createdAt_desc  ou asc
router.get('/headaches',auth ,async (req, res) => {
    const token = req.cookies?.Token
    const payLoad = token.split('.')[1]
    const decodedPayLoad = atob(payLoad)
    const userData = JSON.parse(decodedPayLoad)
    
    try{
        Headache.find({ owner: userData._id }).sort({name: 1}).then((headache) => {
            res.status(201).send(headache)
        }).catch((e) => {
            res.status(500).send()
        })
    } catch(e){
        res.status(500).send()
    }
})

//get headache by id
router.get('/headaches/:id', async (req, res) => {
    const _id = req.params.id

    try{
        const headache = await Headache.findOne({ _id, owner: req.user._id })
        
        if (!headache){
            return res.status(404).send()
        }
        res.send(headache)
    }catch(e){
        res.status(500).send()
    }
})

//update headache
router.patch('/headaches/:id', async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['description', 'duration', 'remedyTaken', 'trigger', 'intensity']
    const isValidOp = updates.every((update) => allowedUpdates.includes(update))

    if(!isValidOp){
        return res.status(400).send({error: 'Invalid operation'})
    }

    try{
        const headache = await Headache.findOne({ _id: req.params.id, owner: req.user._id })
        
        if(!headache){
            return res.status(404).send()
        }

        updates.forEach((update) => headache[update] = req.body[update])
        await headache.save()
        res.send(headache)
    } catch(e){
        res.status(400).send(e)
    }
})

//delete headache
router.delete('/headaches/:id', async (req, res) => {
    try{
        const headache = await Headache.findOneAndDelete({ _id: req.params.id })
        
        if(!headache){
            return res.status(404).send()
        }
        res.send(headache)
    } catch (e){
        res.status(400).send(e)
    }
})

module.exports = router