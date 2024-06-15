const {DataTypes} = require('sequelize')
const db = require('../db/conn')

// User
const User = db.define('User', {
    nome: {type: DataTypes.STRING, required: true},
    email: {type: DataTypes.STRING, required: true},
    senha: {type: DataTypes.STRING, required: true}
})

module.exports = User