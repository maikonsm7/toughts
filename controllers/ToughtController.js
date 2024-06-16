const {raw} = require('mysql2')
const {Op} = require('sequelize') // operador de like (buscar itens com a palavra desejada)
const Tought = require('../models/Tought')
const User = require('../models/User')

class ToughtController {
    static async showToughts(req, res){
        let search = ''
        let qtdSearch = ''
        const dateFormat = tought => {
            let dataObjeto = new Date(tought.createdAt)
            tought.createdAt = `${dataObjeto.getDate()}/${dataObjeto.getMonth()}/${dataObjeto.getFullYear()}`
            return tought
        }
        if(req.query.search){
            search = req.query.search
        }
        try {
            const toughtsData = await Tought.findAll({include: User, where: {title: {[Op.like]: `%${search}%`}}}) // traz os dados do usuário junto, se tiver algo na pesquisa, ele busca só os itens filtrados
            const toughtsUser = toughtsData.map(tought => tought.get({plain: true})) // pegar somente os valores das duas tabelas juntas
            const toughts = toughtsUser.map(dateFormat) // pegar somente os valores das duas tabelas juntas
    
            let emptyToughts = false    
            if(toughts.length === 0 && search === ''){
                emptyToughts = true
            }else if(toughts.length >= 0 && search !== ''){
                qtdSearch = `${toughts.length} ${toughts.length > 1 ? 'resultados' : 'resultado'}`
            }
            res.render('toughts/all', {toughts, emptyToughts, qtdSearch})
        } catch (error) {
            console.error('Erro: ', error)
        }
    }
    static async dashboard(req, res){
        const UserId = req.session.userid
        try {
            const toughts = await Tought.findAll({raw: true, where: {UserId}})
            let emptyToughts = false
            if(toughts.length === 0){
                emptyToughts = true
            }
            res.render('toughts/dashboard', {toughts, emptyToughts})
        } catch (error) {
            console.error('Erro: ', error)
        }
    }
    static createTought(req, res){
        res.render('toughts/add')
    }
    static async createToughtSave(req, res){
        const tought = {
            title: req.body.title,
            UserId: req.session.userid
        }
        try {
            await Tought.create(tought)
            req.flash('message', 'Pensamento adicionado!')
            req.session.save(()=>{
                res.redirect('/')
            })
        } catch (error) {
            console.error('Erro: ', error)
        }
    }
    static async removeTought(req, res){
        const id = req.params.id
        const UserId = req.session.userid
        
        try{
            await Tought.destroy({where: {id, UserId}})
            req.flash('message', 'Pensamento removido!')
            req.session.save(()=>{
                res.redirect('/toughts/dashboard')
            })
        }catch(error){
            console.error('Erro: ', error)
        }
    }
    static async updateTought(req, res){
        const id = req.params.id
        const UserId = req.session.userid
        try {
            const tought = await Tought.findOne({raw: true, where: {id, UserId}})
            res.render('toughts/edit', {tought})
        } catch (error) {
            console.error('Erro: ', error)
        }
    }
    static async updateToughtSave(req, res){
        const id = req.body.id
        const UserId = req.session.userid
        const tought = {
            title: req.body.title
        }
        try {
            await Tought.update(tought, {where: {id, UserId}})
            req.flash('message', 'Pensamento atualizado!')
            req.session.save(()=>{
                res.redirect('/toughts/dashboard')
            })
        } catch (error) {
            console.error('Erro: ', error)
        }
    }
}

module.exports = ToughtController