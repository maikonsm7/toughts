const {Sequelize} = require('sequelize')

const sequelize = new Sequelize('toughtsDB', 'root', '', {
    host: 'localhost',
    dialect: 'mysql'
})

try {
    sequelize.authenticate()
    console.log('Banco de dados conectado!')
} catch (error) {
    console.error('Erro: ', error)
}

module.exports = sequelize