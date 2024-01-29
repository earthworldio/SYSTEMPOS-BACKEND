const conn = require('../connect')
const { DataTypes } = require('sequelize')

const MemberModel = conn.define('member', {
    id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true
    },
    packageID: {
        type: DataTypes.BIGINT
    },
    name: {
        type: DataTypes.STRING(255)
    },
    phone: {
        type: DataTypes.STRING(255)
    }
})
// USE FOR CREATE TABLE IN DATABASE
// MemberModel.sync({ alter: true })
module.exports = MemberModel