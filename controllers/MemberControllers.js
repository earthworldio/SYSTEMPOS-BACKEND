const express = require('express')
const MemberModel = require('../models/MemberModel')
const PackageModel = require('../models/PackageModel')
const app = express()
const jwt = require('jsonwebtoken')
require('dotenv').config()
const service = require('./Service')

app.post('/member/signin', async (req, res) => {
    try {
        const member = await MemberModel.findAll({
            where: {
                phone: req.body.phone,
                password: req.body.password,
            },
        });

        if (member.length > 0) {
            let token = jwt.sign({ id: member[0].id }, process.env.secret);
            res.send({ token: token, message: "success" });
        } else {
            res.statusCode = 401;
            res.send({ message: "not found" });
        }
    } catch (e) {
        res.statusCode = 500;
        res.send({ message: e.message });
    }
})

app.get('/member/info', service.isLogin, async (req, res, next) => {
    try {
        MemberModel.belongsTo(PackageModel)
        const payload = jwt.decode(service.getToken(req))

        const member = await MemberModel.findByPk(payload.id, {
            attributes: ['id', 'name'],
            include: [{ model: PackageModel, attributes: ["name"] }]
        })
        res.send({ result: member, message: 'success' })
    } catch (e) {
        res.statusCode = 500
        return res.send({ message: e.message, })
    }
})

module.exports = app
