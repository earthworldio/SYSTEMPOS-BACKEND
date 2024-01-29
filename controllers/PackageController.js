const express = require('express')
const app = express()
const PackageModel = require('../models/PackageModel')
const MemberModel = require('../models/MemberModel')

app.get('/package/list', async (req, res) => {
    try {
        const result = await PackageModel.findAll()
        res.send({ result: result })
    } catch (e) {
        res.send({ message: e.message })
    }

})

app.post('/package/memberRegister', async (req, res) => {
    try {
        const result = await MemberModel.create(req.body)
        res.send({ message: 'success', result: result })
    } catch (e) {
        res.send({ message: e.message })
    }
})

module.exports = app