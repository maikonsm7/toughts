const {DataTypes} = require('sequelize')
const db = require('../db/conn')
const User = require('./User')

// Tought
const Tought = db.define('Tought', {
    title: {type: DataTypes.STRING, allowNull: false, require: true}
})

Tought.belongsTo(User) // 1 pensamento pertence à 1 usuário
User.hasMany(Tought) // 1 usuário pode ter vários pensamentos

module.exports = Tought